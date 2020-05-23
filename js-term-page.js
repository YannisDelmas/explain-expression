/**
 * Explique une expression: Explique une expression régulière Javascript.
 *
 * @author	Yannis Delmas
 */


/**
 * Fonctionnalités générales.
 */
import { debug, chargeAsync, XXToken, afficheMustache, xxInit } from './explain-expression.js';

/*
 * Initialisations spécifiques à ce module
 */
window.jsTermExplain = function(data) {
	config = Object.assign(config, data);
	document.getElementById('explications').remove();
}
chargeAsync(`${config.module}-explain.${config.lang}.js`, 'explications');

chargeAsync(`${config.module}.pegjs.js`, 'parser');


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
		texteTokenisé = jsTerm.parse(texteBrut);
		explication.classList.remove('erreur');
	} catch(error) {
		explication.innerHTML = '<pre>'+ error.toString()+ '</pre>';
		explication.classList.add('erreur');
		debug(error);
		return;
	}
	debug('tokens: ', texteTokenisé);
	Mustache.defaultEscape = Mustache.escape;
	Mustache.escape = afficheMustache;
	XXToken.modeles = config.explanations;
	explication.innerHTML = '<div>'+ afficheMustache(texteTokenisé)+ '</div>';
	explication.querySelectorAll('a.xx-link').forEach(
		(item) => item.setAttribute('href', config.uriApp + '?module=js-regexp&q='+ escape(item.innerText))
	);
}

/**
 * Finalisation de la préparation de la page.
 */
window.addEventListener('load', function(){
	debug('window loaded');
	// initialisation du parser
	window.jsTerm.create = (...data) => new XXToken(...data);
	// initialisation de l'interface
	xxInit(analyse);
});
