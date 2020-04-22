/**
 * Explique une expression: explique un sélecteur CSS3.
 *
 * @author	Yannis Delmas
 */


/**
 * Initialisations spécifiques à ce module.
 */
function cssSelectorExplain(data) {
	config = Object.assign(config, data);
}
chargeAsync(`${config.module}-explain.${config.lang}.js`, 'explications'); // appelle cssSelectorExplain()

window.addEventListener('load', function(){
	cssSelector.yy.create = (data => data);
});
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
		let s = trouveModele(config.specificity, token);
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
 * en exploitant les indications données dans l'arborescence de modèles. Voir
 * le fichier `README.md` pour le détail du modèle d'explication.
 * 
 * @see README.md
 */
var escapeHTML, afficheMustache;
window.addEventListener('load', function(){
	debug('window🗲 load');
	escapeHTML = Mustache.escape;
	const tippyTemplate = document.getElementById('tippy-template');
	function prepareContenuSection(section, references) {
		const référencesFiltrées = references.filter((reference) => reference.section === section);
		let html = '<ul>';
		for (let index = 0; index < référencesFiltrées.length; index++) {
			const référence = référencesFiltrées[index];
			html += `<li class="section-références__element"><a href="${référence.uri}">${référence.titre && référence.titre !== '' ? référence.titre : référence.uri}</a></li>`
		}
		html += '</ul>';
		return html;
	}
	function prepareContenuTooltip(references) {
		const sections = references.map((reference) => reference.section);
		console.log(sections);
		let html = '';
		for (let index = 0; index < sections.length; index++) {
			const section = sections[index];
			html += `<div class="section-références"><span class="section-références__titre">${section}</span>${prepareContenuSection(section, references)}</div>`;
		}
		return html;
	}
	function prepareReference() {
		return function(text, render) {
			let reference = trouveModele(config.references, this);
			if( ! reference )
				return '';
			if ( Array.isArray(reference) ) {
				let contenuTooltip = encodeHTMLEntities(prepareContenuTooltip(reference));
				console.debug(contenuTooltip);
				return `<span class="ref" data-tippy-content="${contenuTooltip}"><span class="fa fa-info-circle"></span>${render(text)}</span>`;
			}			
 			return `<a class="ref" href="${reference}"><span class="fa fa-info-circle"></span>${render(text)}</a>`;
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
			return Mustache.render(trouveModele(config.explanations, copie), copie);	
		}
		
		return escapeHTML(data);
	};
	Mustache.escape = afficheMustache;

	// le bouton n'est rendu actif que quand la page est opérationnelle
	document.getElementById('expliquer').disabled = false;
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
		const sélecteurTippy = '[data-tippy-content]';
		debug('tokens: ', texteTokenisé);
		
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
		explication.classList.remove('erreur');
		if(document.querySelectorAll(sélecteurTippy).length){
			tippy(sélecteurTippy, {
				allowHTML: true,
				trigger: 'click',
				interactive: true,
			});
		}
	} catch(error) {
		explication.innerHTML = '<pre>'+ error.toString()+ '</pre>';
		explication.classList.add('erreur');
	}
}
