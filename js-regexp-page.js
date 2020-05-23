/**
 * Explique une expression: Explique une expression régulière Javascript.
 *
 * @author	Yannis Delmas
 */


/**
 * Fonctionnalités générales.
 */
import { debug, chargeAsync, XXToken, afficheMustache, encodeHTMLEntities, xxInit } from './explain-expression.js';

/*
 * Initialisations spécifiques à ce module
 */
window.jsRegexpExplain = function(data) {
	config = Object.assign(config, data);
	document.getElementById('explications').remove();
}
chargeAsync(`${config.module}-explain.${config.lang}.js`, 'explications');

chargeAsync(`${config.module}.pegjs.js`, 'parser');

import rr, * as rrClass from "./railroad.js";
Object.assign(window, rr);
window.rrOptions = rrClass.Options;

/**
 * Compteur pour les groupes.
 */
window.compteur = (function () {
	let valeurCompteur;
	return function (valeur) {
		if ( valeur == undefined ) return ++valeurCompteur;
		return (( valeurCompteur = valeur ));
	}
})();

/**
 * Style par défaut des diagrammes, pour l'exportation.
 */
var reCSSRR = /^svg\.railroad-diagram/;
var SvgExportCss =
	Array.from(document.getElementById('explainExpression').sheet.rules)
	.filter( rule => rule.selectorText.match(reCSSRR) )
	.map( rule => rule.cssText )
	.join(' ')
	;

/**
 * Préparation des téléchargements.
 * 
 * Inspiré de https://gitlab.com/javallone/regexper-static/-/blob/master/src/js/regexper.js (Jeff Avallone).
 */
function createDownloadLinks() {
	// fabrication du fichier SVG
	let texteBrut = document.getElementById('expression').value;
	let svg = document.querySelector('#diagramme svg');
	let svgFile =
		`<?xml version="1.0" encoding="utf-8" standalone="yes"?>
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="railroad-diagram" width="${svg.getAttribute('width')}" height="${svg.getAttribute('height')}" viewBox="${svg.getAttribute('viewBox')}">
		<title>Railroad-diagram of regular expression ${encodeHTMLEntities(texteBrut)}</title>
		<defs><style type="text/css">${SvgExportCss}</style></defs>
		${svg.innerHTML}
		</svg>`;
	window.svgBlob = new Blob([svgFile], {type: 'image/svg+xml;charset=utf-8'});
	let linkSvg = document.querySelector('figcaption a.dl1');
	linkSvg.download = 'diagram.svg';
	linkSvg.href = URL.createObjectURL(window.svgBlob);
	// fabrication du fichier PNG
	let linkPng = document.querySelector('figcaption a.dl2');
	linkPng.download = 'diagram.png';
	let canvas = document.createElement('canvas');
	let canvasContext = canvas.getContext('2d');
	let img = new Image;
	img.width  = canvas.width  = Number(svg.getAttribute('width'));
	img.height = canvas.height = Number(svg.getAttribute('height'));
	img.onload = function() {
		canvasContext.drawImage(img, 0, 0, img.width, img.height);
		canvas.toBlob(blob => { linkPng.href = debug(URL.createObjectURL(blob)); }, 'image/png');
	};
	img.src = linkSvg.href;
}


/**
 * Expression régulière pour tester dans le navigateur l'expression saisie.
 */
var re;


/**
 * Test de l'expression régulière saisie sur un exemple.
 */
function testeRE(){
	let cible = document.getElementById('cible').value;
	let n = cible.search(re);
	document.getElementById('match').innerHTML =
		(n<0)
		? config.messages['not_found']
		: ('<p>'+ config.messages['found']+ '</p><blockquote>'+
			cible.replace(re, '<span class="underline">$&</span>')+ '</blockquote>')
		;
}


/**
 * Fonction organisant la tokenisation puis les affichages.
 */
function analyse(){
	let explication = document.querySelector('.explication output');
	let texteBrut = document.getElementById('expression').value;
	if ( ! texteBrut ) {
		explication.innerHTML = '<p>&nbsp;</p>';
		explication.classList.remove('erreur');
		return;
	}
	let texteTokenisé;
	try {
		texteTokenisé = jsRegexp.parse(texteBrut);
		explication.classList.remove('erreur');
	} catch(error) {
		explication.innerHTML = '<pre>'+ error.toString()+ '</pre>';
		explication.classList.add('erreur');
		debug(error);
		return;
	}
	debug('tokens: ', texteTokenisé);
	compteur(0);
	Mustache.defaultEscape = Mustache.escape;
	Mustache.escape = afficheMustache;
	XXToken.modeles = config.explanations;
	let sortie = '<figure id="diagramme"><figcaption>'+ config.messages['diagram']+
		'</figcaption></figure><div>'+ afficheMustache(texteTokenisé)+ '</div>';
	let diagramme;
	let m = texteBrut.match(/^\/(.*)\/([gimsuy]*)$/);
	re = undefined;
	try {
		re = RegExp(m[1], m[2]);
		sortie += '<hr><div>'+ config.messages['test']
			+' <input id="cible" type="text" value="Lorém ipsum@dolor.σιτ 4m3t">'
			+'<p id="match"></p></div>';
	} catch (e) {
		sortie += '<div>'+ config.messages['test_impossible']+ '</div>';
		debug('error trying RegExp in browser:', e);
	}
	try {
		compteur(0);
		XXToken.modeles = config.rr_diagram;
		Mustache.escape = afficheMustache;
		diagramme = eval(debug(afficheMustache(texteTokenisé))).format();
	} catch (e) {
		debug('diagram building error:', e);
	}
	explication.innerHTML = sortie;
	if ( diagramme ) {
		diagramme.addTo(document.getElementById('diagramme'));
		document.querySelector('figcaption .dl').innerHTML =
			'<a href="#" class="dl1"><ruby><span class="fa fa-download"></span><rt>SVG</rt></ruby></a>'+
			' <a href="#" class="dl2"><ruby><span class="fa fa-download"></span><rt>PNG</rt></ruby></a>';
		createDownloadLinks();
	}
	if ( re != undefined ) {
		testeRE();
		document.getElementById('cible').addEventListener('keyup', testeRE);
	}
}

/**
 * Finalisation de la préparation de la page.
 */
window.addEventListener('load', function(){
	debug('window loaded');
	// initialisation du parser
	window.jsRegexp.create = (...data) => new XXToken(...data);
	// initialisation de l'interface
	xxInit(analyse);
});
