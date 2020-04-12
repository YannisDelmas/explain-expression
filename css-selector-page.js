/**
 * Explique une expression: explique un sélecteur CSS3.
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
var affiche, ref, spécificité, spécificité2;
function cssSelectorExplain(donnéesJSON) {
	affiche = donnéesJSON.explanations;
	ref = donnéesJSON.references;
	spécificité = donnéesJSON.specificity;
	let explications = document.getElementById('explications');
	explications.parentNode.removeChild(explications);
}
chargeAsync(`${module}-explain.${lang}.js`, 'explications'); // appelle cssSelectorExplain()

// parser
window.addEventListener('load', function(){
	cssSelector.yy.create = (data => data);
});
chargeAsync(`${module}.jison.js`, 'parser');

// bibliothèque Mustache
chargeAsync('https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.1.0/mustache.min.js');


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
 * Calcule la spécificité d'un sélecteur CSS.
 * 
 * Calcule la spécificité d'un token à l'aide de l'objet `spécificité`,
 * utilisé comme tableau associatif, récursivement. Les types qui ne sont pas
 * mentionnés dans ce tableau sont passés, les autres incrémentent l'index
 * indiqué comme valeur de `spécificité[type]`. La spécificité en cours de calcul
 * est représentée par un tableau `[identifieurs, classes, éléments]`.
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
		let s = trouveModele(spécificité, token);
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
		console.info('tokens: ', texteTokenisé);
		explication.innerHTML =
			'<div>'+ JSlang[0]+ afficheMustache(texteTokenisé)+ '</div>'+
			'<div>'+ JSlang[1]+ calculeSpécificité(texteTokenisé)+ '</div>';
		explication.querySelectorAll('.make-signed').forEach(function(item){
			let text = item.innerText;
			if ( text[0] != '+' && text[0] != '-' ) {
				item.innerHTML = '+'+ item.innerHTML;
			}
		});
		explication.classList.remove('erreur');
	} catch(error) {
		explication.innerHTML = '<pre>'+ error.toString()+ '</pre>';
		explication.classList.add('erreur');
	}
}
