/**
 * Explique une expression: scripts Javascript communs.
 *
 * @author	Yannis Delmas
 */


/**
 * Debugging.
 */
var debug = config.devel
	? ((...args) => {console.debug(...args); return args[0];})
	: ((...args) => args[0]);


/**
 * Chargement asynchrone d'un script JS.
 */
function chargeAsync(uri, id) {
	debug('load async script #', id, ' : ', uri);
	let script = document.createElement('script');
	script.src = uri;
	if ( id != undefined ) script.id = id;
	document.querySelector('head').appendChild(script);
}


/**
 * Retrouve un modèle dans un arbre de modèles.
 */
function trouveModele(templateList, item) {
	let type = templateList[':type'];
	if ( type == undefined ) return '';
	let template = (item[type] == undefined)? undefined: templateList[item[type]];
	if ( template == undefined )
		return (templateList[':default'] == undefined)? '': templateList[':default'];
	if ( typeof template == 'object' && ! (template instanceof Array) )
		return trouveModele(template, item);
	return template;
}

/**
 * Encodage HTML.
 */
function encodeHTMLEntities(text) {
	let textArea = document.createElement('textarea');
	textArea.innerText = text;
	return textArea.innerHTML.replace(/"/gu, '&quot;').replace(/'/gu, '&apos;');
}