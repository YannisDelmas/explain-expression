cssSelectorExplain({
	module: 'css-selector',
	lang: 'fr',
	explanations: {
		selectors_group: 'un ou plusieurs des cas suivants {{#ref}} liste{{/ref}}&nbsp;:<ol>{{#selectors}}<li>{{.}}</li>{{/selectors}}</ol>',
		simple_selector_sequence: '{{#selectors}}{{.}}{{/selectors}}',
		combinator_selector: '{{right}}<blockquote>qui est{{#ref}}{{/ref}} {{combinator}} {{left}}</blockquote>',
		descendant: 'dans {{#ref}} descendant{{/ref}} ',
		child: 'immédiatement dans {{#ref}} enfant{{/ref}}',
		subsequent_sibling: '{{right}}<blockquote>qui suit{{#ref}}suiveur{{/ref}}, dans le même parent, {{left}}</blockquote>',
		next_sibling: '{{right}}<blockquote>qui est immédiatement après{{#ref}}successeur{{/ref}} {{left}}</blockquote>',
		id: 'd’identifiant <code>{{&name}}</code> {{#ref}} #id{{/ref}} ',
		class: 'de classe <code>{{&name}}</code> {{#ref}} .classe{{/ref}} ',
		universal: 'n’importe quel élément {{#ref}}{{/ref}} {{#namespace}}&ensp;dans l’espace de nom <code>{{&.}}</code>{{/namespace}} <blockquote>{{#constraints}}<p>{{.}}</p>{{/constraints}}</blockquote>',
		element: 'un élément <code>&lt;{{&name}}></code> {{#ref}}{{/ref}}<blockquote>{{#constraints}}<p>{{.}}</p>{{/constraints}}</blockquote>',
		constraint_list: 'un élément {{#ref}}{{/ref}}<blockquote>{{#constraints}}<p>{{.}}</p>{{/constraints}}</blockquote>',
		negation: 'qui n’est pas{{#ref}}:not(){{/ref}} &hellip; <blockquote>{{args}}</blockquote>',
		pseudo_class: {
			'=': 'name',
			'?': 'de pseudo-classe <code>{{&name}}</code> {{#ref}}:pseudo-classe{{/ref}}',
			'link': 'qui est un lien qui n’a pas été visité (récemment) {{#ref}}:link{{/ref}}',
			'visited': 'qui est un lien déjà visité (récemment) {{#ref}}:visited{{/ref}}',
			'hover': 'en train d’être survolé {{#ref}}:hover{{/ref}}',
			'active': 'en train d’être activé {{#ref}}:active{{/ref}}',
			'focus': 'qui a actuellement le focus {{#ref}}:focus{{/ref}}',
			// target
			// enabled
			// disabled
			'checked': 'coché {{#ref}}:checked{{/ref}}',
			// indeterminate
			// root
			'first-child': 'qui est le premier enfant de son parent {{#ref}}:first-child{{/ref}}',
			'last-child': 'qui est le dernier enfant de son parent {{#ref}}:last-child{{/ref}}',
			// first-of-type
			// last-of-type
			// only-child
			// only-of-type
			'empty': 'vide (sans enfant ni contenu) {{#ref}}:empty{{/ref}}',
		},
		pseudo_func: {
			'=': 'name',
			'?': 'de pseudo-classe{{#ref}}{{/ref}} <code>{{&name}}</code><blockquote>avec le paramètre {{args}}</blockquote>',
			'lang' : 'qui est dans la langue{{#ref}}{{/ref}} «&nbsp;<span class="value">{{&args}}</span>&nbsp;»',
			'nth-child': 'qui, dans son parent, est un enfant de rang{{#ref}}:nth-child(){{/ref}}&ensp;{{args}}',
			'nth-last-child': 'qui, dans son parent, est un enfant de rang{{#ref}}:nth-last-child(){{/ref}}&ensp;{{args}} en partant de la fin',
			'nth-of-type': 'qui, dans son parent, est de rang{{#ref}}{{/ref}}&ensp;{{args}} parmi les éléments de même balise',
			'nth-last-of-type': 'qui, dans son parent, est de rang{{#ref}}{{/ref}}&ensp;{{args}}, en partant de la fin, parmi les éléments de même balise',
		},
		an_plus_b: '<span class="value">{{a}}</span>×n <span class="value">{{+b}}</span>',
		odd: '<span class="value">impair</span>',
		even: '<span class="value">pair</span>',
		has_attribute: 'qui possède l’attribut <code>{{&name}}</code> {{#ref}}[attrib]{{/ref}}',
		attribute_equals: 'qui possède l’attribut <code>{{&name}}</code> avec la valeur <code>{{&value}}</code> {{#ref}}[attrib]{{/ref}}',
		attribute_starts_with: 'qui possède l’attribut <code>{{&name}}</code> dont la valeur commence par «&nbsp;<span class="value">{{&value}}</span>&nbsp;» {{#ref}}[attrib]{{/ref}}',
		attribute_ends_with: 'qui possède l’attribut <code>{{&name}}</code> dont la valeur se termine par «&nbsp;<span class="value">{{&value}}</span>&nbsp;» {{#ref}}[attrib]{{/ref}}',
		attribute_contains: 'qui possède l’attribut <code>{{&name}}</code> dont la valeur contient «&nbsp;<span class="value">{{&value}}</span>&nbsp;» {{#ref}}[attrib]{{/ref}}',
		attribute_contains_word: 'qui possède l’attribut <code>{{&name}}</code> dont la valeur est constitué d’une suite de mots séparés par des espaces dont l’un est «&nbsp;<span class="value">{{&value}}</span>&nbsp;» {{#ref}}[attrib]{{/ref}}',
		attribute_contains_prefix: 'qui possède l’attribut <code>{{&name}}</code> dont la valeur est <code>{{&value}}</code> ou commence par <code>{{&value}}-</code> {{#ref}}[attrib]{{/ref}}',
		pseudo_element: {
			'=': 'name',
			'?': 'un pseudo-élément <code>{{&name}}</code> {{#ref}}::pseudo-élément{{/ref}} attaché à {{subject}}',
			'first-letter': 'la première lettre {{#ref}}::first-letter{{/ref}} d’{{subject}}',
			'first-line': 'la première ligne {{#ref}}::first-line{{/ref}} d’{{subject}}',
			'before': 'un pseudo-élément ajouté au début {{#ref}}::before{{/ref}} d’{{subject}}',
			'after': 'un pseudo-élément ajouté à la fin {{#ref}}::after{{/ref}} d’{{subject}}',
		},
		pseudo_element_old: '&hellip; auquel est attaché un pseudo-élément <code>{{&name}}</code> <span class="erreur">&rarr; ancienne notation à corriger</span>{{#ref}}::pseudo-élément{{/ref}}',
	},
	references: {
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
		negation: 'https://www.w3.org/TR/selectors-3/#pseudo-classes',
		pseudo_class: 'https://www.w3.org/TR/selectors-3/#pseudo-classes',
		pseudo_class__link: 'https://www.w3.org/TR/selectors-3/#the-link-pseudo-classes-link-and-visited',
		pseudo_class__visited: 'https://www.w3.org/TR/selectors-3/#the-link-pseudo-classes-link-and-visited',
		pseudo_class__hover: 'https://www.w3.org/TR/selectors-3/#the-user-action-pseudo-classes-hover-act',
		pseudo_class__active: 'https://www.w3.org/TR/selectors-3/#the-user-action-pseudo-classes-hover-act',
		pseudo_class__focus: 'https://www.w3.org/TR/selectors-3/#the-user-action-pseudo-classes-hover-act',
		// pseudo_class__target
		// pseudo_class__enabled
		// pseudo_class__disabled
		pseudo_class__checked: 'https://www.w3.org/TR/selectors-3/#checked',
		// pseudo_class__indeterminate
		// pseudo_class__root
		'pseudo_class__first-child': 'https://www.w3.org/TR/selectors-3/#first-child-pseudo',
		'pseudo_class__last-child': 'https://www.w3.org/TR/selectors-3/#last-child-pseudo',
		// pseudo_class__first-of-type
		// pseudo_class__last-of-type
		// pseudo_class__only-child
		// pseudo_class__only-of-type	
		pseudo_class__empty: 'https://www.w3.org/TR/selectors-3/#empty-pseudo',
		pseudo_func: 'https://www.w3.org/TR/selectors-3/#pseudo-classes',
		pseudo_func__lang: 'https://www.w3.org/TR/selectors-3/#lang-pseudo',
		'pseudo_func__nth-child': 'https://www.w3.org/TR/selectors-3/#nth-child-pseudo',
		'pseudo_func__nth-last-child': 'https://www.w3.org/TR/selectors-3/#nth-last-child-pseudo',
		// pseudo_func__nth-of-type
		// pseudo_func__nth-last-of-type
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
	},
	specificity: {
		element: 2,
		pseudo_element_old: 2,
		pseudo_element: 2,
		class: 1,
		pseudo_class: 1,
		pseudo_func: 1,
		has_attribute: 1,
		attribute_equals: 1,
		attribute_starts_with: 1,
		attribute_ends_with: 1,
		attribute_contains: 1,
		attribute_contains_word: 1,
		attribute_contains_prefix: 1,
		id: 0
		/* negation: «Selectors inside the negation pseudo-class are counted like any other,
		but the negation itself does not count as a pseudo-class.» */
	}
});