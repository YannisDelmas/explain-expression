/**
 * Explique une expression: explique un sélecteur CSS3.
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
window.cssSelectorExplain = function(data) {
	Object.assign(config, data);
}
chargeAsync(`${config.module}-explain.${config.lang}.js`, 'explications'); // appelle cssSelectorExplain()

chargeAsync(`${config.module}.jison.js`, 'parser');

/**
 * Calcule la spécificité d'un sélecteur CSS.
 * 
 * Calcule la spécificité d'un token à l'aide de l'objet `config.specificity`,
 * utilisé comme arborescence de modèle.
 * 
 * @param  {Object} token - Le token à expliquer.
 * @return {String}
 */
function calculeSpécificité(token) {
	function iterate(token, a = [0,0,0]) {
		if ( ! token ) return a;
		if ( Array.isArray(token) ) {
			if ( ! token.length ) return a;
			return token.map(t => iterate(t)).reduce(arraySum, a);
		}
		let s = token.trouveModele(config.specificity);
		if ( ! s ) return a;
		return eval(s)(token, a);
	}
	function specMax(liste) {
		let max = [0, 0, 0];
		liste.forEach(item => {
			if ( arraySuperior(item, max) ) max = item;
		});
		return max;
	}
	function metEnForme(v) {
		if ( Array.isArray(v[0]) )
			return v.map(metEnForme).join(', ');
		return `<span class="specificite">
					<span class="specificite--item">${v[0]}</span><sub>#</sub>
					<span class="specificite--item">${v[1]}</span><sub><strong>.</strong></sub>
					<span class="specificite--item">${v[2]}</span><sub>&lt;/></sub>
				</span>`;

	}
	return metEnForme(iterate(token));
}
function arraySum(a1, a2) {
	if ((! Array.isArray(a2)) || ! Array.isArray(a1) ) return undefined;
	let n = Math.max(a1.length, a2.length);
	let s = Array.from({length: n});
	for (let i = 0; i < n; i++) {
		s[i] = (a1[i]?a1[i]:0) + (a2[i]?a2[i]:0);
	}
	return s;
}
function arraySuperior(a1, a2) {
	if ((! Array.isArray(a2)) || ! Array.isArray(a1) ) return undefined;
	let n = Math.max(a1.length, a2.length);
	for (let i = 0; i < n; i++) {
		if ( (a1[i]?a1[i]:'') > (a2[i]?a2[i]:'') ) return true;
	}
	return false;
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
	try {
		let texteTokenisé = cssSelector.parse(texteBrut);
		Mustache.defaultEscape = Mustache.escape;
		Mustache.escape = afficheMustache;
		XXToken.modeles = config.explanations;
		explication.innerHTML =
			'<div>'+ config.messages['subjects']+ afficheMustache(texteTokenisé)+ '</div>'+
			'<div>'+ config.messages['specificity']+
				calculeSpécificité(texteTokenisé)+ '</div>';
		explication.querySelectorAll('.make-signed').forEach(function(item){
			let text = item.innerText;
			if ( text[0] != '+' && text[0] != '-' ) {
				item.innerHTML = '+'+ item.innerHTML;
			}
		});
		const sélecteurTippy = '[data-tippy-content]';
		if(document.querySelectorAll(sélecteurTippy).length){
			tippy(sélecteurTippy, {
				allowHTML: true,
				trigger: 'click',
				interactive: true,
				placement: 'right',
			});
		}
		explication.classList.remove('erreur');
	} catch(error) {
		console.error(error);
		explication.innerHTML = '<pre>'+ error.toString()+ '</pre>';
		explication.classList.add('erreur');
	}
}

/**
 * Finalisation de la préparation de la page.
 */
window.addEventListener('load', function(){
	debug('window loaded');
	// initialisation du parser
	cssSelector.yy.create = (...data) => new XXToken(...data);
	// initialisation de l'interface
	xxInit(analyse);
});
