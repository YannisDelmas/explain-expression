<?php
/**
 * Explique une expression.
 *
 * Application pédagogique pour expliquer les expressions de différents langages informatiques.
 * Pour l'instant, l'application ne traite que les sélecteurs CSS3, en français. Le projet
 * s'appuie sur une grammaire (jison) des expressions.
 * 
 * @author	Yannis Delmas
 */

/* Langue */
$lang = 'fr';
include("css-selector-page.{$lang}.php");

/* Encodage */
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="<?= $lang ?>">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?= $cssSelector['title'] ?></title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha256-eZrrJcwDc/3uDhsdt61sL2oOBY362qM3lon1gyExkL0=" crossorigin="anonymous" />
	<link rel="stylesheet" href="explain-expression.css">
</head>
<body>
	<header>
		<h1><?= $cssSelector['docTitle'] ?></h1>
		<div class="chapeau"><?= $cssSelector['info'] ?></div>
	</header>
	<main>
		<form action="javascript:analyse()">
			<div class="input-group">
				<input type="text" name="selecteur" id="selecteur" placeholder="sélecteur à expliquer">
				<button type="submit" id="expliquer"><span class="fa fa-cog"></span> <?= $cssSelector['explain'] ?></button>
			</div>
		</form>
		<div class="explication">
			<output><p>&nbsp;</p></output>	
		</div>
	</main>
	<section class="exemples">
		<p>
			<?= $cssSelector['exampleA'] ?>
			<code class="exemple">E</code>,
			<code class="exemple">E F</code>,
			<code class="exemple">E.classe</code>,
			<code class="exemple">E:link</code>,
			<code class="exemple">E:visited</code>,
			<code class="exemple">ul li</code>,
			<code class="exemple">form.principal .expliquer</code>,
			<code class="exemple">h1, h2, h3</code>,
			<code class="exemple">ul.diapo ol li</code>,
			<code class="exemple">.item ul, ul ul, .sous-menu</code>.
		</p>
		<p>
			<?= $cssSelector['exampleB'] ?>
			<code class="exemple">*</code>,
			<code class="exemple">E:hover</code>,
			<code class="exemple">p.info.retrait-1re-ligne</code>,
			<code class="exemple">E > F</code>,
			<code class="exemple">section > header</code>.
			<code class="exemple">E#ident</code>,
			<code class="exemple">#chap42</code>.
		</p>
		<p>
			<?= $cssSelector['exampleC'] ?>
		</p>
		<ul>
			<li>
				CSS 1&nbsp;:
				<code class="exemple">h1#chapter1, *#z98y, button.expliquer</code>,
				<code class="exemple">E:active</code>,
				<code class="exemple">E::first-letter</code>.
			</li>
			<li>
				CSS 2&nbsp;:
				<code class="exemple">E[abc]</code>,
				<code class="exemple">E[abc="def"]</code>,
				<code class="exemple">E + F</code>,
				<code class="exemple">h1 + [rel=up]</code>,
				<code class="exemple">E:first-child</code>,
				<code class="exemple">E:focus</code>.
			</li>
			<li>
				CSS 3&nbsp;:
				<code class="exemple">E[abc^="def"]</code>,
				<code class="exemple">E[abc*="def"]</code>,
				<code class="exemple">E:nth-child(odd)</code>,
				<code class="exemple">E:nth-child(3n+1)</code>,
				<code class="exemple">E:nth-of-type(2)</code>,
				<code class="exemple">E:empty</code>,
				<code class="exemple">E:active</code>,
				<code class="exemple">E:disabled</code>,
				<code class="exemple">E::before</code>,
				<code class="exemple">E ~ F</code>,
				<code class="exemple">E:not(.abc)</code>.
				<code class="exemple">[name="bascule"]:checked + label</code>,
				<code class="exemple">#s71:not(aside)</code>,
				<code class="exemple">a:link, p.citation:hover::before</code>,
				<code class="exemple">.a[b = c], c[d]:e:f(3n+2), g > h[i~="j"]</code>,
				<code class="exemple">#abc svg|circle</code>,
				<code class="exemple">[xml|lang]</code>.
			</li>
		</ul>
	</section>
	<footer>
		<p class="message">
			Les contributeurs sont les bienvenus pour ajouter d'autres types d'expressions
			(par exemple les expressions régulières)
			ou pour traduire les explications dans d'autres langues.
			<br><span class="fa-language fa"></span><i lang="en">Contributors are welcome to add
			other types of expressions or to translate the explanations into other languages.</i>
		</p>
		<?= $cssSelector['footer'] ?>
	</footer>
	<script src="css-selector.jison.js"></script>
	<script>
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
					type += ' <a href="'+ ref[type]+ '"><span class="fa fa-info-circle"></span></a>';
				}
				let contenu = [];
				for(clé in token) {
					if ( clé == 'type' ) continue;
					contenu.push('<span class="token-attr"><span class="token-value">'+ clé+ '</span>'+
							fabriqueExplication(token[clé])+ '</span>');
				}
				return contenu.length
					? ('<span class="token"><span class="token-type">'+
						type+ '</span><ul class="token-list"><li>'+ contenu.join('</li><li>')+ '</li></ul></span>')
					: ('<span class="token"><span class="token-type">'+ type+ '</span>')
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
				return '<span class="specificite">'+
					'<span class="specificite--item">'+v[0]+'<sub>#</sub></span>'+
					'<span class="specificite--item">'+v[1]+'<sub>&#x2022;</sub></span>'+
					'<span class="specificite--item">'+v[2]+'<sub>&lt;/></sub></span>'+
					'</span>';
			}
			if ( typeof token != 'object' ) return '';
			return token.selectors.map(t => metEnForme(itère(t,[0,0,0]))).join(', ');
		}

		/**
		 * Fonction organisant la tokenisation puis les affichages.
		 */
		function analyse(){
			let explication = document.querySelector('.explication output');
			let texteBrut = document.getElementById('selecteur').value;
			cssSelector.yy.create = (data => data);
			try {
				let texteTokenisé = cssSelector.parse(texteBrut);
				console.info('tokens: ', texteTokenisé);
				explication.innerHTML =
					'<?= $cssSelector['subjects'] ?> '+ fabriqueExplication(texteTokenisé)+
					'<p><?= $cssSelector['specificity'] ?> '+ calculeSpécificité(texteTokenisé)+ '</p>';
				explication.classList.remove('erreur');				
			} catch(error) {
				explication.innerHTML = '<pre>'+ error.toString()+ '</pre>';
				explication.classList.add('erreur');
			}
		}

		// chargement des données d'explication
		console.debug('css-selector-explain: req.');
		var explicationsJSON, affiche, ref, spécificité;
		function cssSelectorExplain(donnéesJSON) {
			affiche = donnéesJSON.explanations;
			ref = donnéesJSON.references;
			spécificité = donnéesJSON.specificity;
			explicationsJSON.parentNode.removeChild(explicationsJSON);
		}
		explicationsJSON = document.createElement('script');
		explicationsJSON.src = 'css-selector-explain.<?= $lang ?>.js';
		document.querySelector('head').appendChild(explicationsJSON);
		
		// quand tout est prêt…
		document.addEventListener('DOMContentLoaded', function(){
			console.debug('page OK');
			// selecteur est la case de texte contenant le sélecteur à analyser
			let selecteur = document.getElementById('selecteur');
			// il a d'emblée le focus
			selecteur.focus();
			// les exemples remplissent automatiquement 'selecteur' et lancent l'analyse
			document.querySelectorAll('.exemple').forEach(function(item) {
				item.addEventListener('click', function(){
					selecteur.value = this.innerText;
					analyse();
				});
			})
		});
	</script>
</body>
</html>