<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Explique les sélecteurs CSS</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha256-eZrrJcwDc/3uDhsdt61sL2oOBY362qM3lon1gyExkL0=" crossorigin="anonymous" />
	<style>
		html {
			height: 100%;
		}
		body {
			min-height: 100vh; /* 100% de la hauteur du viewport */
			max-width: 960px;
			margin: 0 auto;
			display: grid;
			grid-template-rows: auto auto 1fr auto;
			grid-template-columns: 1fr;
			font-family: Arial, Helvetica, sans-serif;
			font-size: 80%;
			background-image: url(full-bloom.png);
		}
		form {
			text-align: center;
		}
		input, button {
			box-sizing: border-box;
			height: 1.7em;
			font-size: 1.6em;
			border: 2px solid #000;
			text-align: center;
		}
		input {
			width: 30em;
			border-radius: 6px 0 0 6px;
		}
		button {
			border-left: none;
			border-radius: 0 6px 6px 0;
		}
		.explication output {
			display: block;
			font-size: 141%;
			line-height: 1.6;
			border: 3px solid #333;
			border-radius: 0.8em;
			padding: 1ex;
			background-color: #FFF;
		}
		.explication output.erreur {
			background-color: #FCC;
		}

		output .token-type, output .token-value, output .token-error {
			margin-right: 1em;
			padding: 1px 0.5ex;
			border-width: 1px; border-style: dashed;
		}
		output .token  { 
			display: inline-block;
			margin: 2px;
			border: 1px solid #990;
			background-color: rgba(255,255,153,0.2);
		}
		output .token-type  { border-color: #990; background-color: #FF9; }
		output .token-attr {
			display: inline-block;
			margin: 2px;
			border: 1px solid #069;
			background-color: rgba(0,153,255,0.2);
		}
		output .token-value { border-color: #069; background-color: #9CF; }
		output .token-list > li {
			margin: 2px;
			border: 1px solid #090; 
			background-color: rgba(0,255,0, 0.2);
		}
		output .token-error { border-color: #900; background-color: #FCC; }
		
		output p, output ol {
			margin: 0.25ex 0;
		}
		output blockquote {
			margin: 1ex 0 1ex 2em;
			padding: 0 0 0 0.5ex;
			border-left: 2px solid #999;
		}
		output .token-negation .sss-intro {
			display: none;
		}
		output .token-negation .sss-intro+blockquote {
			margin: 0 0 0 -0.5ex;
		}

		a.ref {
			vertical-align: super;
			font-family: Arial, Helvetica, sans-serif;
			font-size: 0.7em;
			padding: 0.25ex 0.5ex;
			border-radius: 0.8em;
			background-color: #DDF;
		}
		
		code {
			font-size: 1.25em;
		}
		code, .value {
			background: #CCE;
			color: #006;
		}
		.exemple {
			padding: 0 0.5ex;
			cursor: pointer;
		}
		.erreur { color: #900; background-color: #FCC; }
		.todo  { color: #990; background-color: #FF9; }
	</style>
</head>
<body>
	<header>
		<h1>Explication de sélecteur CSS 3</h1>
	</header>
	<aside>
		<p>
			Rappel&nbsp;: En CSS une <em>règle</em> est une écriture du type
			<code class="language-css">S { D }</code>, où «S» est un <em>sélecteur</em> et
			«D» une succession de <em>déclarations</em>.
			Le sélecteur définit la liste des <em>sujets</em> à qui s'applique la règle.
			Ces sujets sont des éléments et pseudo-éléments.
			Les déclarations définissent la valeur de propiétés de cet élément.
			Cet outil pédagogique vise à expliquer de façon détaillée un sélecteur CSS en détaillant
			les sujets qu'il désigne.
		</p>	
	</aside>
	<main>
		<form action="javascript:analyse()">
			<p>
				<input type="text" name="selecteur" id="selecteur" placeholder="sélecteur à expliquer"><button type="submit" id="expliquer"><span class="fa fa-cog"></span> expliquer</button>
			</p>
		</form>
		<div class="explication">
			<output><p>&nbsp;</p></output>	
		</div>
		<p>Certains types de sélecteurs (en jaune ou rouge ci-dessous) ne sont pas encore implémentés.</p>
		<p>
			Exemples (CSS 1)&nbsp;:
				<code class="exemple">E</code>,
				<code class="exemple">E F</code>,
				<code class="exemple">E.classe</code>,
				<code class="exemple">E#ident</code>,
				<code class="exemple">E:link</code>,
				<code class="exemple">E:visited</code>,
				<code class="exemple">E:active</code>,
				<code class="exemple">E::first-letter</code>,
				<code class="exemple">ul li</code>.
				<code class="exemple">ul.diapo ol li</code>
				<code class="exemple">.item ul, ul ul, .sous-menu</code>
				<code class="exemple">form.principal .expliquer</code>
				<code class="exemple">#chap42</code>
		</p>
		<p>
			Exemples (CSS 2)&nbsp;:
				<code class="exemple">*</code>,
				<code class="exemple">E[abc]</code>,
				<code class="exemple">E[abc="def"]</code>,
				<code class="exemple">E:first-child</code>,
				<code class="exemple">E:hover</code>,
				<code class="exemple">E:focus</code>,
				<code class="exemple">h1, h2, h3</code>
				<code class="exemple">E > F</code>,
				<code class="exemple">E + F</code>,
				<code class="exemple">section > header</code>
				<code class="exemple">p.info.retrait-1re-ligne</code>
				<code class="exemple">h1 + [rel=up]</code>,
				<code class="exemple">h1#chapter1, *#z98y, button.expliquer</code>
		</p>
		<p>
			Exemples (CSS 3)&nbsp;:
				<code class="exemple">E[abc^="def"]</code>,
				<code class="exemple">E[abc*="def"]</code>,
				<code class="exemple">E:nth-child(odd)</code>,
				<code class="exemple erreur">E:nth-child(3n+1)</code>,
				<code class="exemple">E:nth-of-type(2)</code>,
				<code class="exemple">E:empty</code>,
				<code class="exemple">E:active</code>,
				<code class="exemple">E:disabled</code>,
				<code class="exemple">E::before</code>,
				<code class="exemple">E ~ F</code>,
				<code class="exemple">E:not(.abc)</code>.
				<code class="exemple">[name="bascule"]:checked + label</code>
				<code class="exemple">#s71:not(aside)</code>
				<code class="exemple todo">#abc svg|circle</code>
				<code class="exemple">a:link, p.citation:hover::before</code>
				<code class="exemple">.a[b = c], c[d]:e:f(3n+2), g > h[i~="j"]</code>
				<!--
					TODO voir si on peut supprimer ODD_ARGUMENT en faveur de an_plus_b/odd 
					TODO voir si 'n' doit être réécrit comme dans vraie grammaire CSS3
					TODO voir si an_plus_b/odd peut être adapté pour anciens pseudo_él
				-->
		</p>
	</main>
	<footer>
		<p>
			Page réalisé avec <span class="fa fa-heart" aria-valuetext="coeur" style="color: darkred;"></span>
			par <a href="https://delmas-rigoutsos.nom.fr/">Yannis Delmas</a>.
			Tokenisation à l'aide de <a href="http://zaa.ch/jison/">Jison</a>, à l'aide d'une
			<a href="css-parser.jison">grammaire</a> écrite d'après
			<a href="https://github.com/featurist/bo-selector">bo-selector</a>.
			Image de fond par H.&nbsp;Galeano, <a href="https://www.toptal.com/designers/subtlepatterns/full-bloom-pattern/">subtle patterns</a>.
			<a href="source.php">Code source</a> de cette application.
		</p>
	</footer>
	<script src="css-parser.jison.js"></script>
	<script>
		var affiche = {
			selectors_group: '<p>les cas suivants {{#ref}} liste{{/ref}}&nbsp;:</p><ol>{{#selectors}}<li>{{}}</li>{{/selectors}}</ol>',
			simple_selector_sequence: '{{#selectors}}{{}}{{/selectors}}',
			combinator_selector: '{{right}}<blockquote>qui est{{#ref}}{{/ref}} {{combinator}} {{left}}</blockquote>',
			descendant: 'dans {{#ref}} descendant{{/ref}} ',
			child: 'immédiatement dans {{#ref}} enfant{{/ref}}',
			subsequent_sibling: '{{right}}<blockquote>qui suit{{#ref}}suiveur{{/ref}}, dans le même parent, {{left}}</blockquote>',
			next_sibling: '{{right}}<blockquote>qui est immédiatement après{{#ref}}successeur{{/ref}} {{left}}</blockquote>',
			id: 'd\'identifiant <code>{{&name}}</code> {{#ref}} #id{{/ref}} ',
			class: 'de classe <code>{{&name}}</code> {{#ref}} .classe{{/ref}} ',
			universal: 'n\'importe quel élément {{#ref}}{{/ref}}<blockquote>{{#constraints}}<p>{{}}</p>{{/constraints}}</blockquote>',
			element: 'un élément <code>&lt;{{&name}}></code> {{#ref}}{{/ref}}<blockquote>{{#constraints}}<p>{{}}</p>{{/constraints}}</blockquote>',
			constraint_list: 'un élément {{#ref}}{{/ref}}<blockquote>{{#constraints}}<p>{{}}</p>{{/constraints}}</blockquote>',
			pseudo_class: {
				'=': 'name',
				'?': 'de pseudo-classe <code>{{&name}}</code> {{#ref}}:pseudo-classe{{/ref}}',
				'hover': 'en train d\'être survolé {{#ref}}:hover{{/ref}}',
				'active': 'en train d\'être activé {{#ref}}:active{{/ref}}',
				'focus': 'qui a actuellement le focus {{#ref}}:focus{{/ref}}',
				'empty': 'vide (sans enfant ni contenu) {{#ref}}:empty{{/ref}}',
				'checked': 'coché {{#ref}}:checked{{/ref}}',
			},
			pseudo_func: {
				'=': 'name',
				'?': 'de pseudo-classe <code>{{&name}}({{&args}})</code> {{#ref}}:pseudo-classe{{/ref}}',
				'not': 'qui n\'est pas{{#ref}}:not(){{/ref}} &hellip; <blockquote>{{args}}</blockquote>',
			},
			has_attribute: 'qui possède l\'attribut <code>{{&name}}</code> {{#ref}}[attrib]{{/ref}}',
			attribute_equals: 'qui possède l\'attribut <code>{{&name}}</code> avec la valeur <code>{{&value}}</code> {{#ref}}[attrib]{{/ref}}',
			attribute_starts_with: 'qui possède l\'attribut <code>{{&name}}</code> dont la valeur commence par «&nbsp;<span class="value">{{&value}}</span>&nbsp;» {{#ref}}[attrib]{{/ref}}',
			attribute_ends_with: 'qui possède l\'attribut <code>{{&name}}</code> dont la valeur se termine par «&nbsp;<span class="value">{{&value}}</span>&nbsp;» {{#ref}}[attrib]{{/ref}}',
			attribute_contains: 'qui possède l\'attribut <code>{{&name}}</code> dont la valeur contient «&nbsp;<span class="value">{{&value}}</span>&nbsp;» {{#ref}}[attrib]{{/ref}}',
			attribute_contains_word: 'qui possède l\'attribut <code>{{&name}}</code> dont la valeur est constitué d\'une suite de mots séparés par des espaces dont l\'un est «&nbsp;<span class="value">{{&value}}</span>&nbsp;» {{#ref}}[attrib]{{/ref}}',
			attribute_contains_prefix: 'qui possède l\'attribut <code>{{&name}}</code> dont la valeur est <code>{{&value}}</code> ou commence par <code>{{&value}}-</code> {{#ref}}[attrib]{{/ref}}',
			pseudo_element: {
				'=': 'name',
				'?': 'un pseudo-élément <code>{{&name}}</code> {{#ref}}::pseudo-élément{{/ref}} attaché à {{subject}}',
				'first-letter': 'la première lettre {{#ref}}::first-letter{{/ref}} d\'{{subject}}',
				'first-line': 'la première ligne {{#ref}}::first-line{{/ref}} d\'{{subject}}',
				'before': 'un pseudo-élément ajouté au début {{#ref}}::before{{/ref}} d\'{{subject}}',
				'after': 'un pseudo-élément ajouté à la fin {{#ref}}::after{{/ref}} d\'{{subject}}',
			},
			pseudo_element_old: '&hellip; auquel est attaché un pseudo-élément <code>{{&name}}</code> <span class="erreur">&rarr; ancienne notation à corriger</span>{{#ref}}::pseudo-élément{{/ref}}',
		};
		var ref = {
			/* https://www.w3.org/TR/selectors-3/ https://www.w3.org/TR/CSS2/ */
			selectors_group: 'https://www.w3.org/TR/selectors-3/#grouping',
			descendant: 'https://www.w3.org/TR/selectors-3/#descendant-combinators',
			child: 'https://www.w3.org/TR/selectors-3/#child-combinators',
			subsequent_sibling: 'https://www.w3.org/TR/selectors-3/#general-sibling-combinators',
			next_sibling: 'https://www.w3.org/TR/selectors-3/#adjacent-sibling-combinators',
			id: 'https://www.w3.org/TR/selectors-3/#id-selectors',
			class: 'https://www.w3.org/TR/selectors-3/#class-html',
			universal: 'https://www.w3.org/TR/selectors-3/#universal-selector',
			element: 'https://www.w3.org/TR/selectors-3/#type-selectors',
			pseudo_class: 'https://www.w3.org/TR/selectors-3/#pseudo-classes',
			pseudo_class__hover: 'https://www.w3.org/TR/selectors-3/#the-user-action-pseudo-classes-hover-act',
			pseudo_class__active: 'https://www.w3.org/TR/selectors-3/#the-user-action-pseudo-classes-hover-act',
			pseudo_class__focus: 'https://www.w3.org/TR/selectors-3/#the-user-action-pseudo-classes-hover-act',
			pseudo_class__empty: 'https://www.w3.org/TR/selectors-3/#empty-pseudo',
			pseudo_class__checked: 'https://www.w3.org/TR/selectors-3/#checked',
			pseudo_func: 'https://www.w3.org/TR/selectors-3/#pseudo-classes',
			pseudo_func__not: 'https://www.w3.org/TR/selectors-3/#pseudo-classes',
			has_attribute: 'https://www.w3.org/TR/selectors-3/#attribute-selectors',
			attribute_equals: 'https://www.w3.org/TR/selectors-3/#attribute-selectors',
			attribute_starts_with: 'https://www.w3.org/TR/selectors-3/#attribute-substrings',
			attribute_ends_with: 'https://www.w3.org/TR/selectors-3/#attribute-substrings',
			attribute_contains: 'https://www.w3.org/TR/selectors-3/#attribute-substrings',
			attribute_contains_word: 'https://www.w3.org/TR/selectors-3/#attribute-representation',
			attribute_contains_prefix: 'https://www.w3.org/TR/selectors-3/#attribute-representation',
			pseudo_element: 'https://www.w3.org/TR/selectors-3/#pseudo-elements',
			'pseudo_element__first-letter': 'https://www.w3.org/TR/selectors-3/#first-letter',
			'pseudo_element__first-line': 'https://www.w3.org/TR/selectors-3/#first-line',
			pseudo_element__before: 'https://www.w3.org/TR/selectors-3/#gen-content',
			pseudo_element__after: 'https://www.w3.org/TR/selectors-3/#gen-content',
			pseudo_element_old: 'https://www.w3.org/TR/selectors-3/#pseudo-elements',
		};
		
	</script>
	<script>
		parser.yy.create = function(data) { return data; };
		var explication = document.querySelector('.explication output');
		var selecteur = document.getElementById('selecteur');
		var debug = true;
		var grammar;

		function fabriqueExplication(token) {
			// console.debug('fabriqueExplication', token);
			if ( Array.isArray(token) ) {
				return token.length? ('<ul class="token-list"><li>'+ token.map(fabriqueExplication).join('</li><li>')+ '</li></ul>'): '';
			}
			if ( typeof token == 'string' ) {
				if ( token == '' ) return '';
				token = { type: token };
			}
			if ( typeof token != 'object' ) {
				console.debug('erreur: ', token);
				return '<code class="token-error">'+ token.toString()+ '</code>';
			}
			let type = token.type;
			if ( affiche[type] ) {
				// console.debug('type: ', type, affiche[type], ref[type]);
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
				let propriétésRegex = /{{(\&?[-_a-zA-Z0-9\xA0-\uFFFF]+)}}/g;
				let propriétés = [];
				while ((( match = propriétésRegex.exec(modele) )) != null ) propriétés.push(match[1]);
				propriétés.forEach( (clé) => {
					let brut = (clé[0] == '&');
					let propriété = brut? clé.substring(1): clé;
					// console.debug('type ', type, ', clé ', clé, ', propriété ', propriété);
					// console.debug('token : ', token);
					let contenu = (token[propriété] == undefined)
						? ''
						: (brut
							? ((typeof token[propriété] == 'object')? token[propriété].type: token[propriété])
							: fabriqueExplication(token[propriété])
							)
						;
					modele = modele.replace('{{'+clé+'}}', contenu);
				});
				if ((( match = /^(.*){{#([-_a-zA-Z0-9\xA0-\uFFFF]+)}}(.*){{}}(.*){{\/\2}}(.*)$/.exec(modele) )) != null) {
					let boucle = match[2];
					let liste = Array.isArray(token[boucle])? token[boucle]: [token[boucle]];
					return match[1]+ match[3]+ liste.map(fabriqueExplication).join(match[4]+match[3])+ match[4]+match[5];
				}
				return modele;
			} else {
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

		function analyse(){
			let texteBrut = selecteur.value;
			try {
				let texteTokenisé = parser.parse(texteBrut);
				// console.debug(texteTokenisé);
				explication.innerHTML = fabriqueExplication(texteTokenisé);
				explication.classList.remove('erreur');
			} catch(error) {
				explication.innerHTML = '<pre>'+ error.toString()+ '</pre>';
				explication.classList.add('erreur');
			}
			
		}

		document.addEventListener('DOMContentLoaded', function(){
			selecteur.focus();
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