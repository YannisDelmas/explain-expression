jsRegexpExplain({
	module: 'js-regexp',
	lang: 'fr',
	explanations: {
		':type': 'type',
		':default': '<span class="token"><span class="token-type">{{&type}}</span></span>',
		'RegularExpression':
			'<span class="token">Expression régulière\
				{{#global}}global{{/global}}\
				{{#ignoreCase}}ignoreCase{{/ignoreCase}}\
				{{#multiline}}multiline{{/multiline}}\
				{{#dotAll}}dotAll{{/dotAll}}\
				{{#unicode}}unicode{{/unicode}}\
				{{#sticky}}sticky{{/sticky}} :\
				<div>{{pattern}}</div>\
			</span>',
		'Disjunction': '<span class="token"><span class="token-type">{{&type}}</span><ul>{{#alternatives}}<li>{{.}}</li>{{/alternatives}}</ul></span>',
		'TermList': '<span class="token"><span class="token-type">{{&type}}</span><ol>{{#terms}}<li>{{.}}</li>{{/terms}}</ol></span>',
		'Quantifier': '<span class="token">Répéter de <span class="value">{{repeatMin}}</span> à <span class="value">{{repeatMax}}{{^repeatMax}}&#x221e;{{/repeatMax}}</span> fois {{#repeatNonGreedy}}de façon non vorace{{/repeatNonGreedy}} : <div>{{term}}</div></span>',
		},
	references: {
		':type': 'type',
	},
});