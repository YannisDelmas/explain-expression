all: css-selector.jison.js js-regexp.pegjs.js

css-selector.jison.js: css-selector.jison
	jison $< -o $@

js-regexp.pegjs.js: js-regexp.pegjs
	pegjs -o $@ --format globals -e jsRegexp $<