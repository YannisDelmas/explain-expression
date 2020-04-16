jsRegexpExplain({
	module: 'js-regexp',
	lang: 'fr',
	explanations: {
		':type': 'type',
		':default': '<span class="token"><span class="token-type">{{&type}}</span></span>',
		RegularExpression:
			'Expression régulière{{#global}}, globale{{/global}}{{#ignoreCase}}, insensible à la casse{{/ignoreCase}}{{#multiline}}, multiligne{{/multiline}}{{#dotAll}}, avec point attrape-tout{{/dotAll}}{{#unicode}}, compatible Unicode{{/unicode}}, {{#sticky}}sticky{{/sticky}}&nbsp;:\
			<blockquote>{{pattern}}</blockquote>',
		Disjunction: 'L’un des motifs suivants&nbsp;:<ul>{{#alternatives}}<li>{{.}}</li>{{/alternatives}}</ul>',
		TermList: 'Successivement, la suite des motifs suivants&nbsp;:<ol>{{#terms}}<li>{{.}}</li>{{/terms}}</ol>',
		Quantifier: {
			':type': 'repeat',
			':default': 'Répéter {{^repeatMax}}au moins {{/repeatMax}}<span class="value">{{repeatMin}}</span>{{#repeatMax}} à <span class="value">{{repeatMax}}</span>{{/repeatMax}} fois{{#repeatNonGreedy}}, de façon non vorace{{/repeatNonGreedy}}&nbsp;: <blockquote>{{term}}</div></blockquote>',
			exact: 'Répéter <span class="value">{{repeatMin}}</span> fois&nbsp;: <blockquote>{{term}}</div></blockquote>',
		},
		Assertion: {
			':type': 'name',
			anchor_begin: 'condition: début du texte',
			anchor_end: 'condition: fin du texte',
			word_boundary: 'condition: limite de mot',
			non_word_boundary: 'condition: pas une limite de mot',
			lookahead: '{{#inverse}}N’est pas{{/inverse}}{{^inverse}}Est{{/inverse}} suivi par le motif (lookahead)&nbsp;:<blockquote>{{content}}</blockquote>',
			lookbehind: '{{#inverse}}N’est pas{{/inverse}}{{^inverse}}Est{{/inverse}} précédé par le motif (lookbehind)&nbsp;:<blockquote>{{content}}</blockquote>',
		},
		CharacterSet: {
			':type': 'code',
			':default': '<span class="token"><span class="token-type">{{&type}}</span> <span class="value">{{&code}}</span></span>',
			// any
			// d
			// D
			// s
			// S
			// w
			// W
		}
	},
	references: {
		':type': 'type',
	},
	interface: {
		'test': 'Tester cette expression sur un exemple&nbsp;:',
		'test_impossible': 'Expression non reconnue par votre navigateur.',
		'not_found': 'Pas de correspondance trouvée.',
		'found': 'Correspondance trouvée en position %d.',
	}
});