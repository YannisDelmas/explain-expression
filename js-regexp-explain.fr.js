jsRegexpExplain({
	module: 'js-regexp',
	lang: 'fr',
	explanations: {
		':type': 'type',
		':default': '<span class="token"><span class="token-type">{{&type}}</span> (pas implémenté)</span>',
		RegularExpression:
			'Expression régulière{{#ref}} RegExp{{/ref}}{{#global}}, globale{{/global}}{{#ignoreCase}}, insensible à la casse{{/ignoreCase}}{{#multiline}}, multiligne{{/multiline}}{{#dotAll}}, avec point attrape-tout{{/dotAll}}{{#unicode}}, compatible Unicode{{/unicode}}{{#sticky}}, sticky{{/sticky}}&nbsp;:\
			<blockquote>{{pattern}}</blockquote>',
		Empty: 'le motif vide',
		Disjunction: 'L’un des motifs suivants&nbsp;:<ul>{{#alternatives}}<li>{{.}}</li>{{/alternatives}}</ul>',
		TermList: 'Successivement, la suite des motifs suivants&nbsp;:<ol>{{#terms}}<li>{{.}}</li>{{/terms}}</ol>',
		Quantifier: {
			':type': 'repeat',
			':default': '<span class="value">{{repeatMin}}</span>{{#repeatMax}} à <span class="value">{{repeatMax}}</span>{{/repeatMax}} fois{{^repeatMax}} au moins{{/repeatMax}}{{#ref}}{{/ref}}{{#repeatNonGreedy}}, de façon non vorace{{/repeatNonGreedy}}&nbsp;: {{term}}',
			exact: '<span class="value">{{repeatMin}}</span> fois{{#ref}}{{/ref}}&nbsp;: {{term}}',
		},
		Assertion: {
			':type': 'name',
			anchor_begin: 'condition: début du texte',
			anchor_end: 'condition: fin du texte',
			word_boundary: 'condition: limite de mot',
			non_word_boundary: 'condition: pas une limite de mot',
			lookahead: 'condition: {{#invert}}n’est pas{{/invert}}{{^invert}}est{{/invert}} suivi par le motif (lookahead)&nbsp;:<blockquote>{{content}}</blockquote>',
			lookbehind: 'condition: {{#invert}}n’est pas{{/invert}}{{^invert}}est{{/invert}} précédé du motif (lookbehind)&nbsp;:<blockquote>{{content}}</blockquote>',
		},
		Group: 'le motif ou groupe{{#capture}} n°<span class="value">{{&number}}</span>{{#name}} nommé \u2329<span class="value">{{&name}}</span>\u232A{{/name}}{{/capture}}<blockquote>{{content}}</blockquote>',
		GroupReference: 'le contenu du motif/groupe {{#name}}nommé \u2329<span class="value">{{&name}}</span>\u232A{{/name}}{{^name}}n°<span class="value">{{&number}}</span>{{/name}}',
		CharacterSet: {
			':type': 'code',
			':default': '<span class="token"><span class="token-type">{{&type}}</span> <span class="value">{{&code}}</span></span>',
			any: 'un caractère',
			d: 'un chiffre',
			D: 'un caractère qui n’est pas un chiffre',
			w: 'un caractère alphanumérique&nbsp;: a-z, A-Z, 0-9 ou _',
			W: 'un caractère qui n’est pas alphanumérique',
			s: 'un caractère blanc / d’espacement',
			S: 'un caractère qui n’est pas un blanc',
		},
		Litteral: {
			':type': 'name',
			':default': 'le caractère <span class="value">{{&value}}</span>',
			NUL: 'le caractère <span class="value">NULL</span>',
		},
		ControlEscape: {
			':type': 'code',
			f: 'le caractère <span class="value">saut de page</span>',
			n: 'le caractère <span class="value">saut de ligne</span>',
			r: 'le caractère <span class="value">retour chariot</span>',
			t: 'le caractère <span class="value">tabulation</span>',
			v: 'le caractère <span class="value">tabulation verticale</span>',
			b: 'le caractère <span class="value">retour arrière</span>',
		},
		CharacterClass: 'un caractère qui {{#invert}}n’est pas{{/invert}}{{^invert}}est{{/invert}} parmi&nbsp;:<ul>{{#parts}}<li>{{.}}</li>{{/parts}}</ul>',
		CharacterRange: 'les caractères compris entre {{begin}} et {{end}}',
		ControlCharacter: 'le caractère <span class="value">contrôle-{{&control}}</span> (code {{&code}})',
		HexEscape: 'le caractère de code hexadécimal <span class="value">{{&code}}</span><sub>h</sub>',
		UnicodeEscape: 'le caractère Unicode de code hexadécimal <span class="value">{{&code}}</span><sub>h</sub>',
	},
	references: {
		':type': 'type',
		RegularExpression: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_r%C3%A9guli%C3%A8res',
		Quantifier:  'https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_r%C3%A9guli%C3%A8res/Quantificateurs',
		// TODO
		// Disjunction: '',
		// Assertion: {
		// 	':type': 'name',
		// 	anchor_begin: '',
		// 	anchor_end: '',
		// 	word_boundary: '',
		// 	non_word_boundary: '',
		// 	lookahead: '',
		// 	lookbehind: '',
		// },
		// Group: '',
		// GroupReference: '',
		// CharacterSet: '',
		// Litteral: '',
		// ControlEscape: '',
		// CharacterClass: '',
		// ControlCharacter: '',
		// HexEscape: '',
		// UnicodeEscape: '',
	},
	rr_diagram: {
		':type': 'type',
		':default': 'Comment("«{{&type}}» (pas implémenté)")',
		RegularExpression: 'Diagram({{pattern}})',
		Disjunction: 'Choice(Math.floor({{&number}}/2){{#alternatives}},{{.}}{{/alternatives}})',
		TermList: 'Sequence({{#terms}}{{.}},{{/terms}})',
		Quantifier: {
			':type': 'repeat',
			any: 'ZeroOrMore({{term}}{{#repeatNonGreedy}},Comment("non vorace"){{/repeatNonGreedy}})',
			required: 'OneOrMore({{term}}{{#repeatNonGreedy}},Comment("non vorace"){{/repeatNonGreedy}})',
			optional: 'Optional({{term}}{{#repeatNonGreedy}},Comment("non vorace"){{/repeatNonGreedy}})',
			exact:  'OneOrMore({{term}},Comment("{{repeatMin}} fois"))',
			min:    'OneOrMore({{term}},Comment("{{repeatMin}}..\u221E fois{{#repeatNonGreedy}} non vorace{{/repeatNonGreedy}}"))',
			minmax: 'OneOrMore({{term}},Comment("{{repeatMin}}..{{repeatMax}} fois{{#repeatNonGreedy}} non vorace{{/repeatNonGreedy}}"))',
		},
		Assertion: {
			':type': 'name',
			anchor_begin: 'NonTerminal("début texte")',
			anchor_end: 'NonTerminal("fin texte")',
			word_boundary: 'NonTerminal("limite mot")',
			non_word_boundary: 'NonTerminal("pas limite mot")',
			lookahead: 'Group({{content}},"{{#invert}}pas {{/invert}}suivi par")',
			lookbehind: 'Group({{content}},"{{#invert}}pas {{/invert}}précédé de")',
		},
		Group: '{{#capture}}(function(){let n = " n°{{&number}}{{#name}} \u2329{{&name}}\u232A{{/name}}"; return {{/capture}}Group({{content}}, "groupe"{{#capture}}+n);})({{/capture}})',
		GroupReference: 'NonTerminal("réf. {{#name}}\u2329{{&name}}\u232A{{/name}}{{^name}}n°{{&number}}{{/name}}")',
		Empty: 'Comment("rien")',
		CharacterSet: {
			':type': 'code',
			':default': 'NonTerminal("{{&code}}")',
			any: 'NonTerminal("caractère")',
			d: 'NonTerminal("chiffre")',
			D: 'NonTerminal("non-chiffre")',
			w: 'NonTerminal("alphanum.")',
			W: 'NonTerminal("non-alphanum.")',
			s: 'NonTerminal("blanc")',
			S: 'NonTerminal("non-blanc")',
		},
		Litteral: {
			':type': 'name',
			':default': 'Terminal("{{&value}}")',
			NUL: 'Terminal("NULL")',
		},
		ControlEscape: {
			':type': 'code',
			f: 'Terminal("saut page")',
			n: 'Terminal("saut ligne")',
			r: 'Terminal("retour chariot")',
			t: 'Terminal("tab.")',
			v: 'Terminal("v. tab")',
			b: 'Terminal("ret. arrière")',
		},
		CharacterClass: 'Object.assign(Group(Choice(Math.floor({{&number}}/2){{#parts}},{{.}}{{/parts}}), "un {{#invert}}pas {{/invert}}parmi"), {attrs:{class:"js-regexp-CharacterClass{{#invert}} invert{{/invert}}"}})',
		CharacterRange: 'Sequence({{begin}},Comment(".."),{{end}})',
		ControlCharacter: 'Terminal("contrôle-{{&control}}")',
		HexEscape: 'Terminal("\\\\x{{&code}}")',
		UnicodeEscape: 'Terminal("\\\\u{"+"{{&code}}}")',
	},
	messages: {
		'diagram': 'Diagramme de l’automate <span class="dl"></span>&nbsp;:',
		'test': 'Tester cette expression sur un exemple&nbsp;:',
		'test_impossible': 'Cette expression n’est pas reconnue par votre navigateur.',
		'not_found': 'Pas de correspondance trouvée.',
		'found': 'Correspondance(s) trouvée(s)&nbsp;:',
	}
});