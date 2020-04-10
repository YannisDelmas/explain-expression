/**
 * Explique une expression.
 *
 * @author	Yannis Delmas
 */


/**
 * Chargement asynchrone d'un script JS.
 */
function chargeAsync(uri, id) {
	console.debug('chargeAsync: ', uri);
	let script = document.createElement('script');
	script.src = uri;
	script.id = id;
	document.querySelector('head').appendChild(script);
}


/**
 * Initialisations spécifiques à ce module.
 */
var lang = document.querySelector('html').getAttribute('lang');

// données d'explication
var affiche, ref, spécificité;
function cssSelectorExplain(donnéesJSON) {
	affiche = donnéesJSON.explanations;
	ref = donnéesJSON.references;
	spécificité = donnéesJSON.specificity;
	let explications = document.getElementById('explications');
	explications.parentNode.removeChild(explications);
}
chargeAsync(`css-selector-explain.${lang}.js`, 'explications'); // appelle cssSelectorExplain()

// parser
chargeAsync('css-selector.jison.js', 'parser');

/**
 * Fabrique l'explication d'une expression tokenisée.
 * 
 * Fonction récursive déterminant l'explication d'une expression tokenisée
 * en exploitant les indications données dans l'objet `affiche`. Voir
 * le fichier `README.md` pour le détail du modèle d'explication.
 * 
 * @see README.md
 * 
 * @param  {Object} token - Le token à expliquer.
 * @return {String}
 */
function fabriqueExplication(token) {
	// Cas 1 : les tableaux -> on fait une liste non numérotée
	if ( Array.isArray(token) ) {
		return token.length? ('<ul class="token-list"><li>'+ token.map(fabriqueExplication).join('</li><li>')+ '</li></ul>'): '';
	}
	// Cas 2 : les nombres -> on les renvoie tels quels
	if ( typeof token == 'number' ) {
		return token;
	}
	// Cas 3 : les chaînes -> on les traites comme des objets contenant seulement un type
	if ( typeof token == 'string' ) {
		if ( token == '' ) return '';
		token = { type: token };
	}
	// Cas 4 : valeur inconnue -> erreur
	if ( typeof token != 'object' ) {
		return '<code class="token-error">'+ token.toString()+ '</code>';
	}
	// Cas 5 : les tokens à proprement parler
	let type = token.type;
	if ( affiche[type] ) {
		// Cas 5.a : ce type est connu dans le tableau d'affichage
		let modele = affiche[type];
		if ( typeof modele == 'object' ) {
			let attribut = modele['=']; // nom de l'attribut
			attribut = (token[attribut] != undefined)? token[attribut]: '?'; // valeur de l'attribut (déf.: '?')
			if (typeof attribut == 'object') attribut = attribut.type;
			if ( modele[attribut] == undefined ) {
				modele = modele['?'];
			} else {
				type += '__'+ attribut;
				modele = modele[attribut];
			}
		}
		if ( ref[type] ) {
			modele = modele
				.replace('{{#ref}}', '<a class="ref" href="'+ ref[type]+ '"><span class="fa fa-info-circle"></span> ')
				.replace('{{/ref}}', '</a>');
		} else {
			modele = modele.replace(/{{#ref}}.*{{\/ref}}/, '');
		}
		let match;
		let propriétésRegex = /{{(&?)(\+?)([-_a-zA-Z0-9\xA0-\uFFFF]+)}}/;
		while ((( match = propriétésRegex.exec(modele) )) != null ) {
			let propriété = match[3];
			let contenu = token[propriété];
			contenu = (contenu == undefined)
				? ''
				: (match[1]
					? ((typeof contenu == 'object')? contenu.type: contenu)
					: (match[2]
						? (((contenu<0)?'':'+')+contenu)
						: fabriqueExplication(contenu)
						)
					)
				;
			modele = modele.replace(match[0], contenu);
		}
		propriétésRegex = /{{#([-_a-zA-Z0-9\xA0-\uFFFF]+)}}(.*){{(&?)\.}}(.*){{\/\1}}/;
		while ((( match = propriétésRegex.exec(modele) )) != null) {
			let contenu = '';
			let liste = token[match[1]];
			if ( liste != undefined ) {
				if ( ! Array.isArray(liste) ) liste = [liste];
				if ( liste.length )
					contenu =
						match[2]+
						(match[3]? liste: liste.map(fabriqueExplication))
							.join(match[4]+match[2])
						+match[4];
			}
			modele = modele.replace(match[0], contenu);
		}
		return modele;
	} else {
		// Cas 5.b : ce type n'est pas connu dans le tableau d'affichage
		if ( ref[type] ) {
			type += ` <a href="${ref[type]}"><span class="fa fa-info-circle"></span></a>`;
		}
		let contenu = [];
		for(clé in token) {
			if ( clé == 'type' ) continue;
			contenu.push(
				`<span class="token-attr">
					<span class="token-value">${clé}</span>
					${fabriqueExplication(token[clé])}
				</span>`);
		}
		return contenu.length
			? (`<span class="token">
						<span class="token-type">${type}</span>
						<ul class="token-list">
							<li>${contenu.join('</li><li>')}</li>
						</ul>
					</span>`)
			: (`<span class="token">
						<span class="token-type">${type}</span>
					</span>`)
			;
	}
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
	function itère(token, v) {
		if ( Array.isArray(token) ) {
			v = token
				.map(t => itère(t,[0,0,0]))
				.reduce((a, v) => [v[0]+a[0], v[1]+a[1], v[2]+a[2]], v);
		} else if ( typeof token == 'object' ) {
			if ( spécificité[token.type] != undefined ) {
				v[spécificité[token.type]] ++;
			}
			for(const param in token) {
				if ( typeof token[param] == 'string' ) continue;
				v = itère(token[param], v);
			}
		}
		return v;
	}
	function metEnForme(v) {
		return `<span class="specificite">
							<span class="specificite--item">${v[0]}'</span><sub>#</sub>
							<span class="specificite--item">${v[1]}'</span><sub><strong>.</strong></sub>
							<span class="specificite--item">${v[2]}'</span><sub>&lt;/></sub>
						</span>`;

	}
	if ( typeof token != 'object' ) return '';
	return token.selectors.map(t => metEnForme(itère(t,[0,0,0]))).join(', ');
}

/**
 * Fonction organisant la tokenisation puis les affichages.
 */
function analyse(){
	let explication = document.querySelector('.explication output');
	let texteBrut = document.getElementById('expression').value;
	cssSelector.yy.create = (data => data);
	try {
		let texteTokenisé = cssSelector.parse(texteBrut);
		console.info('tokens: ', texteTokenisé);
		explication.innerHTML = JSlang[0]+ fabriqueExplication(texteTokenisé)+
			'<p>'+ JSlang[1]+ calculeSpécificité(texteTokenisé)+ '</p>';
		explication.classList.remove('erreur');				
	} catch(error) {
		explication.innerHTML = '<pre>'+ error.toString()+ '</pre>';
		explication.classList.add('erreur');
	}
}
