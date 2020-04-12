cssSelectorExplain({
	module: 'css-selector',
	lang: 'fr',
	explanations: {
		':type': 'type',
		':default': '<span class="token"><span class="token-type">{{&type}}</span></span>',

		/* Level 1-3 selectors, except :not(), plus :dir() (CSS4) */
		simple_selector_sequence: '{{#selectors}}{{.}}{{/selectors}}',
		combinator_selector: '{{right}}<blockquote>qui {{combinator}} {{left}}</blockquote>',
			descendant: 'est dans {{#ref}} descendant{{/ref}} ',
			child: 'est immédiatement dans {{#ref}} enfant{{/ref}}',
			subsequent_sibling: 'suit{{#ref}}suiveur{{/ref}}, dans le même parent,',
			next_sibling: 'est immédiatement après{{#ref}}successeur{{/ref}}',
		id: 'd’identifiant <code>{{&name}}</code> {{#ref}} #id{{/ref}} ',
		class: 'de classe <code>{{&name}}</code> {{#ref}} .classe{{/ref}} ',
		universal:
			'un élément{{#ref}}{{/ref}}\
			{{#namespace}}&ensp;dans l’espace de nom <code>{{&.}}</code>{{/namespace}}\
			{{#universal_namespace}}&ensp;dans n’importe quel espace de nom{{/universal_namespace}} \
			<blockquote>{{#constraints}}<p>{{.}}</p>{{/constraints}}</blockquote>',
		element:
			'un élément\
			<code>{{^universal_namespace}}&lt;{{/universal_namespace}}{{#namespace}}{{&.}}:{{/namespace}}{{&name}}{{^universal_namespace}}>{{/universal_namespace}}</code> {{#ref}}{{/ref}}\
			{{#universal_namespace}}&ensp;dans n’importe quel espace de nom{{/universal_namespace}} \
			<blockquote>{{#constraints}}<p>{{.}}</p>{{/constraints}}</blockquote>',
		constraint_list: 'un élément {{#ref}}{{/ref}}<blockquote>{{#constraints}}<p>{{.}}</p>{{/constraints}}</blockquote>',
		pseudo_class: {
			':type': 'name',
			':default': 'de pseudo-classe <code>{{&name}}</code> {{#ref}}:pseudo-classe{{/ref}}',
			'link': 'qui est un lien qui n’a pas été visité (récemment) {{#ref}}:link{{/ref}}',
			'visited': 'qui est un lien déjà visité (récemment) {{#ref}}:visited{{/ref}}',
			'hover': 'en train d’être survolé {{#ref}}:hover{{/ref}}',
			'active': 'en train d’être activé {{#ref}}:active{{/ref}} (p.ex. clic sur un lien)',
			'focus': 'qui a actuellement le focus {{#ref}}:focus{{/ref}}',
			'target': 'qui est actuellement ciblé par le navigateur {{#ref}}:target{{/ref}}',
			'enabled': 'qui n’est pas actuellement désactivé {{#ref}}:enabled{{/ref}}',
			'disabled': 'qui est actuellement désactivé {{#ref}}:disabled{{/ref}}',
			'checked': 'actuellement coché {{#ref}}:checked{{/ref}}',
			'indeterminate': 'qui est un élément de formulaire dans un état indéterminé {{#ref}}:indeterminate{{/ref}}',
			'root': 'racine du document{{#ref}}{{/ref}}',
			'first-child': 'qui est le premier enfant de son parent {{#ref}}:first-child{{/ref}}',
			'last-child': 'qui est le dernier enfant de son parent {{#ref}}:last-child{{/ref}}',
			'first-of-type': 'qui, dans son parent, est le premier{{#ref}}{{/ref}} parmi les éléments de même balise',
			'last-of-type': 'qui, dans son parent, est le dernier{{#ref}}{{/ref}} parmi les éléments de même balise',
			'only-child': 'enfant unique{{#ref}}{{/ref}} de son parent',
			'only-of-type': 'qui n’a aucun nœud frère de même balise{{#ref}}{{/ref}}',
			'empty': 'vide (sans enfant ni contenu) {{#ref}}:empty{{/ref}}',
		},
		pseudo_func: {
			':type': 'name',
			':default': 'de pseudo-classe{{#ref}}{{/ref}} <code>{{&name}}</code><blockquote>avec le paramètre {{args}}</blockquote>',
			'lang' : 'qui est dans la langue{{#ref}}{{/ref}} «&nbsp;<span class="value">{{&args}}</span>&nbsp;»',
			'dir': 'dont la langue s’écrit {{args}}{{#ref}} :dir(){{/ref}}',
			'nth-child': 'qui, dans son parent, est un enfant de rang{{#ref}}:nth-child(){{/ref}}&ensp;{{args}}',
			'nth-last-child': 'qui, dans son parent, est un enfant de rang{{#ref}}:nth-last-child(){{/ref}}&ensp;{{args}} en partant de la fin',
			'nth-of-type': 'qui, dans son parent, est de rang{{#ref}}{{/ref}}&ensp;{{args}} parmi les éléments de même balise',
			'nth-last-of-type': 'qui, dans son parent, est de rang{{#ref}}{{/ref}}&ensp;{{args}}, en partant de la fin, parmi les éléments de même balise',
		},
			an_plus_b: '<span class="value">{{a}}</span>×n <span class="make-signed"><span class="value">{{b}}</span></span>',
			odd: '<span class="value">impair</span>',
			even: '<span class="value">pair</span>',
			ltr: '<span class="value">de gauche à droite</span>',
			rtl: '<span class="value">de droite à gauche</span>',
		attribute: {
			':type': 'subtype',
			has_attribute: 'qui possède l’attribut {{name}} {{#ref}}[attrib]{{/ref}}',
			attribute_equals: 'qui possède l’attribut {{name}} avec la valeur <code>{{&value}}</code> {{#ref}}[attrib]{{/ref}}',
			attribute_starts_with: 'qui possède l’attribut {{name}} dont la valeur commence par «&nbsp;<span class="value">{{&value}}</span>&nbsp;» {{#ref}}[attrib]{{/ref}}',
			attribute_ends_with: 'qui possède l’attribut {{name}} dont la valeur se termine par «&nbsp;<span class="value">{{&value}}</span>&nbsp;» {{#ref}}[attrib]{{/ref}}',
			attribute_contains: 'qui possède l’attribut {{name}} dont la valeur contient «&nbsp;<span class="value">{{&value}}</span>&nbsp;» {{#ref}}[attrib]{{/ref}}',
			attribute_contains_word: 'qui possède l’attribut {{name}} dont la valeur est constitué d’une suite de mots séparés par des espaces dont l’un est «&nbsp;<span class="value">{{&value}}</span>&nbsp;» {{#ref}}[attrib]{{/ref}}',
			attribute_contains_prefix: 'qui possède l’attribut {{name}} dont la valeur est <code>{{&value}}</code> ou commence par <code>{{&value}}-</code> {{#ref}}[attrib]{{/ref}}',
		},
		namespace_prefix_ident:
			'<code>{{&ident}}</code>\
			{{#namespace}}&ensp;dans l’espace de nom <code>{{&.}}</code>{{/namespace}}\
			{{#universal_namespace}}&ensp;dans n’importe quel espace de nom{{/universal_namespace}}',
		pseudo_element: {
			':type': 'name',
			':default': 'un pseudo-élément <code>{{&name}}</code> {{#ref}}::pseudo-élément{{/ref}} attaché à {{subject}}',
			'first-letter': 'la première lettre {{#ref}}::first-letter{{/ref}} d’{{subject}}',
			'first-line': 'la première ligne {{#ref}}::first-line{{/ref}} d’{{subject}}',
			'before': 'un pseudo-élément ajouté au début {{#ref}}::before{{/ref}} d’{{subject}}',
			'after': 'un pseudo-élément ajouté à la fin {{#ref}}::after{{/ref}} d’{{subject}}',
		},
		pseudo_element_old: '&hellip; auquel est attaché un pseudo-élément <code>{{&name}}</code> <span class="erreur">&rarr; ancienne notation à corriger</span>{{#ref}}::pseudo-élément{{/ref}}',
		
		/* logical selectors : liste (CSS1), :not() (CSS3); :is() :where() :has() (CSS4) */
		logical: {
			':type': 'name',
			':default': '<code>{{&name}}</code> {{#ref}}{{/ref}} &hellip; <blockquote>{{args}}</blockquote>',
			selector_list: 'un ou plusieurs des cas suivants {{#ref}} liste{{/ref}}&nbsp;:<ol>{{#selectors}}<li>{{.}}</li>{{/selectors}}</ol>',
			not: 'qui n’est pas{{#ref}}{{/ref}} &hellip; <blockquote>{{args}}</blockquote>',
			is: 'qui est{{#ref}}{{/ref}} &hellip; <blockquote>{{args}}</blockquote>',
			where: 'qui est{{#ref}}{{/ref}} &hellip; <blockquote>{{args}}</blockquote>',
			// has
		},
		
		/* sélecteurs introduit dans CSS3-UI */
		// E:read-write, E:read-only, E:placeholder-shown, E:default, 
		// E:valid, E:invalid, E:in-range, E:out-of-range, E:required, E:optional
		
		/* other CSS4 - https://www.w3.org/TR/selectors-4/ */
		// E[foo="bar" i], E[foo="bar" s]
		// E:dir(ltr)
		// E:lang(zh, "*-hant")
		// E:any-link, E:local-link, E:target-within, E:scope
		// E:current, E:current(s), E:past, E:future
		// E:focus-within, E:focus-visible
		// E:blank, E:user-invalid
		// E:nth-child(n [of S]?), E:nth-last-child(n [of S]?)
		// F || E, E:nth-col(n), E:nth-last-col(n)
	},
	references: {
		/* https://www.w3.org/TR/selectors-3/ https://www.w3.org/TR/CSS2/ */
		':type': 'type',
		descendant: 'https://www.w3.org/TR/selectors-3/#descendant-combinators',
		child: 'https://www.w3.org/TR/selectors-3/#child-combinators',
		subsequent_sibling: 'https://www.w3.org/TR/selectors-3/#general-sibling-combinators',
		next_sibling: 'https://www.w3.org/TR/selectors-3/#adjacent-sibling-combinators',
		id: 'https://www.w3.org/TR/selectors-3/#id-selectors',
		class: 'https://www.w3.org/TR/selectors-3/#class-html',
		universal: 'https://www.w3.org/TR/selectors-3/#universal-selector',
		element: 'https://www.w3.org/TR/selectors-3/#type-selectors',
		pseudo_class: {
			':type': 'name',
			':default': 'https://www.w3.org/TR/selectors-3/#pseudo-classes',
			link: 'https://www.w3.org/TR/selectors-3/#the-link-pseudo-classes-link-and-visited',
			visited: 'https://www.w3.org/TR/selectors-3/#the-link-pseudo-classes-link-and-visited',
			hover: 'https://www.w3.org/TR/selectors-3/#the-user-action-pseudo-classes-hover-act',
			active: 'https://www.w3.org/TR/selectors-3/#the-user-action-pseudo-classes-hover-act',
			focus: 'https://www.w3.org/TR/selectors-3/#the-user-action-pseudo-classes-hover-act',
			target: 'https://www.w3.org/TR/selectors-3/#target-pseudo',
			enabled: 'https://www.w3.org/TR/selectors-3/#enableddisabled',
			disabled: 'https://www.w3.org/TR/selectors-3/#enableddisabled',
			checked: 'https://www.w3.org/TR/selectors-3/#checked',
			indeterminate: 'https://www.w3.org/TR/selectors-3/#indeterminate',
			root: 'https://www.w3.org/TR/selectors-3/#root-pseudo',
			'first-child': 'https://www.w3.org/TR/selectors-3/#first-child-pseudo',
			'last-child': 'https://www.w3.org/TR/selectors-3/#last-child-pseudo',
			'first-of-type': 'https://www.w3.org/TR/selectors-3/#first-of-type-pseudo',
			'last-of-type': 'https://www.w3.org/TR/selectors-3/#last-of-type-pseudo',
			'only-child': 'https://www.w3.org/TR/selectors-3/#only-child-pseudo',
			'only-of-type': 'https://www.w3.org/TR/selectors-3/#only-of-type-pseudo',
			empty: 'https://www.w3.org/TR/selectors-3/#empty-pseudo',
		},
		pseudo_func: {
			':type': 'name',
			':default': 'https://www.w3.org/TR/selectors-3/#pseudo-classes',
			lang: 'https://www.w3.org/TR/selectors-3/#lang-pseudo',
			'nth-child': 'https://www.w3.org/TR/selectors-3/#nth-child-pseudo',
			'nth-last-child': 'https://www.w3.org/TR/selectors-3/#nth-last-child-pseudo',
			'nth-of-type': 'https://www.w3.org/TR/selectors-3/#nth-of-type-pseudo',
			'nth-last-of-type': 'https://www.w3.org/TR/selectors-3/#nth-last-of-type-pseudo',
			dir: 'https://www.w3.org/TR/selectors-4/#the-dir-pseudo',
		},
		attribute: {
			':type': 'subtype',
			has_attribute: 'https://www.w3.org/TR/selectors-3/#attribute-selectors',
			attribute_equals: 'https://www.w3.org/TR/selectors-3/#attribute-selectors',
			attribute_starts_with: 'https://www.w3.org/TR/selectors-3/#attribute-substrings',
			attribute_ends_with: 'https://www.w3.org/TR/selectors-3/#attribute-substrings',
			attribute_contains: 'https://www.w3.org/TR/selectors-3/#attribute-substrings',
			attribute_contains_word: 'https://www.w3.org/TR/selectors-3/#attribute-representation',
			attribute_contains_prefix: 'https://www.w3.org/TR/selectors-3/#attribute-representation',
		},
		pseudo_element: {
			':type': 'name',
			':default': 'https://www.w3.org/TR/selectors-3/#pseudo-elements',
			'first-letter': 'https://www.w3.org/TR/selectors-3/#first-letter',
			'first-line': 'https://www.w3.org/TR/selectors-3/#first-line',
			before: 'https://www.w3.org/TR/selectors-3/#gen-content',
			after: 'https://www.w3.org/TR/selectors-3/#gen-content',
		},
		pseudo_element_old: 'https://www.w3.org/TR/selectors-3/#pseudo-elements',
		logical: {
			':type': 'name',
			':default': 'https://www.w3.org/TR/selectors-4/#logical-combination',
			selector_list: 'https://www.w3.org/TR/selectors-3/#grouping',
			not: 'https://www.w3.org/TR/selectors-4/#negation',
			is: 'https://www.w3.org/TR/selectors-4/#matches',
			where: 'https://www.w3.org/TR/selectors-4/#zero-matches',
			has: 'https://www.w3.org/TR/selectors-4/#relational',
		},
	},
	specificity: {
		':type': 'type',
		simple_selector_sequence: '(t,a) => iterate(t.selectors[0], a)',
		constraint_list: '(t,a) => iterate(t.constraints, a)',
		universal: '(t,a) => iterate(t.constraints, a)',
		element: '(t,a) => iterate(t.constraints, arraySum([0,0,1], a))',
		pseudo_element: '(t,a) => iterate(t.subject, arraySum([0,0,1], a))',
		pseudo_element_old: '(t,a) => arraySum([0,0,1], a)',
		class:        '(t,a) => arraySum([0,1,0], a)',
		pseudo_class: '(t,a) => arraySum([0,1,0], a)',
		pseudo_func:  '(t,a) => arraySum([0,1,0], a)',
		attribute:    '(t,a) => arraySum([0,1,0], a)',
		combinator_selector: '(t,a) => iterate([t.left, t.right], a)',
		id: '(t,a) => arraySum([1,0,0], a)',
		logical: {
			':type': 'name',
			selector_list: '(t,a) => t.selectors.map(i => iterate(i))',
			not: '(t,a) => arraySum(specMax(t.args.selectors.map(i => iterate(i))), a)',
			is:  '(t,a) => arraySum(specMax(t.args.selectors.map(i => iterate(i))), a)',
			where: '(t,a) => a',
		},
	}
});