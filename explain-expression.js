/**
 * Explique une expression: scripts Javascript communs.
 *
 * @author	Yannis Delmas
 */


/**
 * Debugging.
 * 
 * @type {function} fonction de débogage, si le mode développement est activé.
 * @param {...*}	éléments à afficher dans la console.
 * @returns			le premier argument.
 */
var debug = config.devel
	? ((...args) => {console.debug(...args); return args[0];})
	: ((...args) => args[0]);


/**
 * Chargement sur demande d'un script JS.
 * 
 * @param {string} uri	adresse du script à charger.
 * @param {string} [id]	identifiant de l'élément <script>.	
 */
function chargeAsync(uri, id) {
	debug('load async script #', id, ' : ', uri);
	let script = document.createElement('script');
	script.src = uri;
	if ( id != undefined ) script.id = id;
	document.querySelector('head').appendChild(script);
}


/**
 * Classe pour représenter les tokens de l'expression.
 */
class XXToken {
	/** Type du token.
	 * @type {?string}
	 */
	type = null;

	/**
	 * Créer un token.
	 * @param {...object} obj	objet(s) ayant les propriétés initiales du token à créer.
	 */
	constructor(...obj) {
		Object.assign(this, ...obj);
	}

	/**
	 * Arborescence de modèles à utiliser pour le prochain affichage.
	 *
	 * @see {@link README.md}	pour plus d'information sur ces arborescences.
	 */
	static modeles;
	
	/**
	 * Retrouve un modèle dans un arbre de modèles.
	 * 
	 * @param {?object}	templateList	arborescence de modèle (par défaut: __modeles).
	 * @see {@link README.md}			pour plus d'information sur ces arborescences.
	 * @returns {string}				modèle à appliquer.
	 */
	trouveModele(templateList = undefined) {
		// debug('trouveModele()', this, templateList);
		if ( templateList == undefined ) templateList = XXToken.modeles;
		let type = templateList[':type'];
		if ( type == undefined ) return '';
		let template = (this[type] == undefined)? undefined: templateList[this[type]];
		if ( template == undefined )
			return (templateList[':default'] == undefined)? '': templateList[':default'];
		if ( typeof template == 'object' && ! (template instanceof Array) )
			return this.trouveModele(template);
		return template;
	}
	
	/**
	 * Eventuelle référence littérale.
	 * 
	 * @type {(string|function)}
	 */
	__ref;
	set ref(val) { this.__ref = val; }
	get ref() {
		// cas où on a une valeur
		if ( this.__ref != undefined ) return(this.__ref);
		// recherche de la référence
		let reference = this.trouveModele(config.references);
		if( ! reference ) return '';
		// on renvoie une fonction admise par Mustache.js
		return () => function(text, render) {
			let refText = render(text);
			if ( refText ) refText = `<span class="ref-text">${refText}</span>`;
			if ( Array.isArray(reference) ) {
				let contenuTooltip = XXToken.prepareTooltip(reference);
				return `<span class="ref" data-tippy-content="${contenuTooltip}"><span class="fa fa-info-circle"></span>${refText}</span>`;
			}			
			return `<a class="ref" href="${reference}"><span class="fa fa-info-circle"></span>${refText}</a>`;
		};
	}

	static prepareSection(section, references) {
		return	references
				.filter(référence => référence.section === section)
				.map(référence =>
					`<li><a href="${référence.uri}">${référence.titre? référence.titre: decodeURI(référence.uri)}</a></li>`
				)
				.join('');
	}	
	static prepareTooltip(references) {
		const sections = [... new Set(references.map(reference => reference.section))];
		return encodeHTMLEntities(
			sections
			.map( section =>
				`<div class="section-${section}"><span class="section-${section}__titre">${config.sections[section]?config.sections[section]:section}</span><ul>${XXToken.prepareSection(section, references)}</ul></div>`
			)
			.join('')
		);
	}
}

/**
 * Fonction d'échappement normale de Mustache.
 */
Mustache.defaultEscape = Mustache.escape;

/**
 * Fabrique l'explication d'une expression tokenisée.
 * 
 * Fonction récursive déterminant l'explication d'une expression tokenisée
 * en exploitant les indications données dans l'arborescence de modèle.
 * 
 * @see {@link README.md}	pour le détail du modèle d'explication.
 * @param {*} data			donnée (token ou valeur) à traiter avec Mustache.
 * @returns {string}
 */
function afficheMustache(data) {
	// Cas 1 : nombre -> renvoyer tel quel
//	if ( typeof data == 'number' ) return data;
	// Cas 2 : nul ou vide -> renvoyer ''
	if ( ! data )
		return '';
	// Cas 3 : chaîne -> traiter comme un token
	if ( typeof data == 'string' ) {
		data = new XXToken({ type: data });
	}
	// Cas 4 : token
	if ( data instanceof XXToken ) {
		return Mustache.render(data.trouveModele(), data);
	}
	// par défaut : fonctionnement normal de Mustache
	return Mustache.defaultEscape(data);
};


/**
 * Encodage fiable en entités HTML d'une chaîne de caractères.
 * 
 * @param {string} text	la chaîne de caractères à encoder.
 * @returns {string}	la chaîne encodée.
 */
function encodeHTMLEntities(text) {
	let textArea = document.createElement('textarea');
	textArea.innerText = text;
	return textArea.innerHTML.replace(/"/gu, '&quot;').replace(/'/gu, '&apos;');
}