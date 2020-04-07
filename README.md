# Explain expression

Educational application to explain the expressions of different computer languages. For the moment, the application only processes _CSS3 selectors_, in French. The project is based on a grammar (jison) of expressions.

Description files are ready to be translated in other languages, contributors are welcome!
I would also like to process _Regular expressions_, contributors are welcome also!

Application pédagogique pour expliquer les expressions de différents langages informatiques. Pour l'instant, l'application ne traite que les _sélecteurs CSS3_, en français. Le projet s'appuie sur une grammaire (jison) des expressions.
Les contributeurs sont les bienvenus, soit pour ajouter le traitement des _Expressions régulières_, soit pour traduire les explications dans d'autres langues.

## Explanations file format / format du fichier d'explication

Les fichiers donnant les explications sont au format JavaScript: un objet servant de tableau associatif enrobé dans un appel de fonction `nomModuleExplain()`, par exemple `cssSelectorExplain()` pour le module d'explication des sélecteurs css `nom-module`.

Pour les sélecteurs CSS, la structure est la suivante:
```javascript
cssSelectorExplain({
	module: 'css-selector',
	lang: /* code ISO de langue */,
	explanations: { /* liste des explications */ },
	references:   { /* liste des références */ },
	specificity:  { /* ne pas modifier cette partie */ }
});
```
Pour un token `{type: 'TTT', abc: …, def: …, ghi: …}`, l'application consulte le champ `explanations.TTT`.
Si ce champ est une chaîne de caractère, elle sert de modèle d'explication.
Si ce champ est un objet, les modèles d'explication fonctionnent par sous-type. Ces modèles d'explications de sous-type ont la structure suivante:

```javascript
{
	'=': /* nom du champ à utiliser comme sous-type */,
	'?': /* modèle par défaut */,
	'XYZ': /* modèle pour le sous-type XYZ */,
	…
}
```

Les modèles sont des chaînes de caractères dans lesquelles l'application effectue un certains nombre de remplacements de type [Mustache](https://github.com/janl/mustache.js):

- `{{propriété}}` : Remplacé par la valeur de la propriété, interprétée comme un token. Remplacé par rien, si la propriété est absente.
- `{{&propriété}}` : Remplacé par la valeur de la propriété, comme simple valeur. Vide si la propriété est absente.
- `{{+propriété}}` : Remplacé par la valeur de la propriété, comme nombre dont le signe est obligatoirement indiqué. Vide si la propriété est absente.
- `{{#ref}}indication{{/ref}}` : Remplacé par un lien donnant une référence et contenant, éventuellement, une indication. Vide s'il n'y a pas de référence pour ce type ou sous-type.
- `{{#propriété}}préfixe{{.}}suffixe{{/propriété}}` : Si la propriété est présente, on l'insère, encadrée par un préfixe et un suffixe. Si cette propriété contient une liste, l'application itère sur cette liste, le préfixe et le suffixe sont répétés pour chaque item de la liste.
L'écriture `{{.}}` est traitée comme token et `{{&.}}` comme simple valeur.
