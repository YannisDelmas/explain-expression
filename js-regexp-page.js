/**
 * Explique une expression: Explique une expression régulière Javascript.
 *
 * @author	Yannis Delmas
 */


/**
 * Chargement asynchrone d'un script JS.
 */
function chargeAsync(uri, id) {
	console.debug('chargeAsync #', id, ' : ', uri);
	let script = document.createElement('script');
	script.src = uri;
	if ( id != undefined ) script.id = id;
	document.querySelector('head').appendChild(script);
}


/**
 * Initialisations spécifiques à ce module.
 */
var lang = document.querySelector('html').getAttribute('lang');
var module = document.body.dataset.module;

// données d'explication
var affiche, ref, interface;
function jsRegexpExplain(donnéesJSON) {
	affiche = donnéesJSON.explanations;
	ref = donnéesJSON.references;
	interface = donnéesJSON.interface;
	let explications = document.getElementById('explications');
	explications.parentNode.removeChild(explications);
}
chargeAsync(`${module}-explain.${lang}.js`, 'explications');

chargeAsync(`${module}.pegjs.js`);


/**
 * Retrouve un modèle dans un arbre de modèles.
 */
function trouveModele(base, item) {
	let type = base[':type'];
	if ( type == undefined ) return '';
	let modele = base[item[type]];
	if ( modele == undefined )
		return (base[':default'] == undefined)? '': base[':default'];
	if ( typeof modele == 'object' )
		return trouveModele(modele, item);
	return modele;
}

/**
 * Fabrique l'explication d'une expression tokenisée.
 * 
 * Fonction récursive déterminant l'explication d'une expression tokenisée
 * en exploitant les indications données dans l'objet `affiche`. Voir
 * le fichier `README.md` pour le détail du modèle d'explication.
 * 
 * @see README.md
 */
var escapeHTML, afficheMustache;
window.addEventListener('load', function(){
	console.info('window🗲 load');
	escapeHTML = Mustache.escape;
	function prepareReference() {
		return function(text, render) {
			let reference = trouveModele(ref, this);
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
			return Mustache.render(trouveModele(affiche, copie), copie);
		}
		return escapeHTML(data);
	};
	Mustache.escape = afficheMustache;
});

/**
 * Test de l'expression régulière saisie sur un exemple.
 */
function testeRE(){
	let cible = document.getElementById('cible').value;
	let n = cible.search(re);
	document.getElementById('match').innerText =
		(n<0)?interface['not_found']:(interface['found'].replace('%d', n));
}

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
		//document.getElementById('testRE').addEventListener()
	} catch(error) {
		explication.innerHTML = '<pre>'+ error.toString()+ '</pre>';
		explication.classList.add('erreur');
		return;
	}
	console.info('tokens: ', texteTokenisé);
	let sortie = afficheMustache(texteTokenisé)
	let m;
	if ((m = texteBrut.match(/^\/([^/]*)\/([gimsuy]*)$/) )) {
		re = undefined;
		try {
			re = RegExp(m[1], m[2]);
			sortie += '<div>'+ interface['test']
				+' <input id="cible" type="text" value="Lorem ipsum@dolor.sit 4m3t">'
				+'<p id="match"></p></div>';
		} catch (e) {
			sortie += '<div>'+ interface['test_impossible']+ '</div>';
		}
	}
	explication.innerHTML = sortie;
	if ( re != undefined ) {
		testeRE();
		document.getElementById('cible').addEventListener('keyup', testeRE);
	}
}
