/**
 * Explique une expression: Explique une expression régulière Javascript.
 *
 * @author	Yannis Delmas
 */


/**
 * Initialisations spécifiques à ce module.
 */
function jsRegexpExplain(data) {
	config = Object.assign(config, data);
}
chargeAsync(`${config.module}-explain.${config.lang}.js`, 'explications');

chargeAsync(`${config.module}.pegjs.js`);

{
	debug('load async module : railroad.js');
	let script = document.createElement('script');
	script.setAttribute('type', 'module');
	script.innerText =
		'import rr, * as rrClass from "./railroad.js";\
		Object.assign(window, rr);\
		window.rrOptions = rrClass.Options;';
	document.querySelector('head').appendChild(script);
}

/**
 * Fabrique l'explication d'une expression tokenisée.
 * 
 * Fonction récursive déterminant l'explication d'une expression tokenisée
 * en exploitant les indications données dans l'arborescence de modèle. Voir
 * le fichier `README.md` pour le détail du modèle d'explication.
 * 
 * @see README.md
 */
var escapeHTML, afficheMustache, diagrammeMustache;
window.addEventListener('load', function(){
	debug('window🗲 load');
	escapeHTML = Mustache.escape;
	function prepareReference() {
		return function(text, render) {
			let reference = trouveModele(config.references, this);
			return reference
				? `<a class="ref" href="${reference}"><span class="fa fa-info-circle"></span>${render(text)}</a>`
				: '';
		}
	}
	afficheMustache = function(data) {
		// Cas 1 : nombre -> renvoyer tel quel
		if ( typeof data == 'number' )
			return data;
		// Cas 2 : nul ou vide -> renvoyer ''
		if ( ! data )
			return '';
		// Cas 3 : chaîne -> traiter comme un token
		if ( typeof data == 'string' ) {
			data = { type: data };
		}
		// Cas 4 : token
		if ( typeof data == 'object' ) {
			let copie = Object.assign({ref: prepareReference}, data);
			Mustache.escape = afficheMustache;
			return Mustache.render(trouveModele(config.explanations, copie), copie);
		}
		// par défaut : fonctionnement normal de Mustache
		return escapeHTML(data);
	};
	diagrammeMustache = function(data) {
		// Cas 1 : nombre -> renvoyer tel quel
		if ( typeof data == 'number' )
			return data;
		// Cas 2 : nul ou vide -> renvoyer ''
		if ( ! data )
			return '';
		// Cas 3 : chaîne -> traiter comme un token
		if ( typeof data == 'string' ) {
			data = { type: data };
		}
		// Cas 4 : token
		if ( typeof data == 'object' ) {
			Mustache.escape = diagrammeMustache;
			return Mustache.render(trouveModele(config.rr_diagram, data), data);
		}
		// par défaut : fonctionnement normal de Mustache
		return escapeHTML(data);
	};
	// le bouton n'est rendu actif que quand la page est opérationnelle
	document.getElementById('expliquer').disabled = false;
});

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
 * Compteur pour les groupes.
 */
var compteur = (function () {
	let valeurCompteur;
	return function (valeur) {
		if ( valeur == undefined ) return ++valeurCompteur;
		return (( valeurCompteur = valeur ));
	}
})();

/**
 * Fonction organisant la tokenisation puis les affichages.
 */
var re; // typed RE
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
		return;
	}
	debug('tokens: ', texteTokenisé);
	compteur(0);
	let sortie = '<div id="diagramme"></div>'+ afficheMustache(texteTokenisé);
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
		diagramme = eval(debug(diagrammeMustache(texteTokenisé))).format();
	} catch (e) {
		debug('diagram building error:', e);
	}
	explication.innerHTML = sortie;
	if ( diagramme ) {
		diagramme.addTo(document.getElementById('diagramme'));
	}
	if ( re != undefined ) {
		testeRE();
		document.getElementById('cible').addEventListener('keyup', testeRE);
	}
}
