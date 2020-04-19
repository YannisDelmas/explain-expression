# Explain expression

Educational application to explain the expressions of different computer languages. For the moment, the application only processes _CSS3 selectors_, in French. The project is based on a grammar (jison) of expressions.

Description files are ready to be translated in other languages, contributors are welcome!
I would also like to process _Regular expressions_, contributors are welcome also!

Application pédagogique pour expliquer les expressions de différents langages informatiques. Pour l'instant, l'application ne traite que les _sélecteurs CSS3_, en français. Le projet s'appuie sur une grammaire (jison) des expressions.
Les contributeurs sont les bienvenus, soit pour ajouter le traitement des _Expressions régulières_, soit pour traduire les explications dans d'autres langues.

## Explanations file format / format du fichier d'explication

Les fichiers donnant les explications sont au format JavaScript: un objet servant de tableau associatif enrobé dans un appel de fonction `nomModuleExplain()`, par exemple `cssSelectorExplain()` pour le module d'explication des sélecteurs css.

Pour les sélecteurs CSS, la structure est la suivante:
```javascript
cssSelectorExplain({
	module: 'css-selector' /* nom du module */,
	lang:   'fr' /* code ISO de langue */,
	explanations: { /* arborescence des explications */ },
	references:   { /* arborescence des références */ },
	specificity:  { /* spécifique à ce module : spécificité */ },
	messages:     { /* autres messages d'interface */ }
});
```

Pour chaque `item`, l'arborescence `explanations` fournit un modèle
[Mustache](https://github.com/janl/mustache.js).
La propriété `explanations[':type']` indique quelle propriété des items doit être utilisée pour
trouver le modèle. Pour un item de type `abc`, c'est `explanations['abc']` qui donnera le modèle.
Si ceci n'existe pas, l'application utilisera le modèle `explanations[':default']`  (ou
la chaîne vide, à défaut).
Si `explanations['abc']` est lui-même un objet, la recherche se poursuit récursivement en utilisant
la propriété `explanations['abc'][':type']`.

Contrairement au fonctionnement par défaut de la bibliothèque
[Mustache](https://github.com/janl/mustache.js), les remplacements `{{propriété}}` non numériques
sont considérés comme des items et l'arborescence `explanations` est utilisée pour leur trouver
un modèle.
Pour utiliser une valeur brute sans remplacement, on utilisera l'écriture `{{&propriété}}`
ou `{{{propriété}}}`.
Pour effectuer un test ou une boucle sur une propriété, on peut utiliser des sections
`{{#propriété}}préfixe{{.}}suffixe{{/propriété}}` ou `{{#propriété}}contenu{{/propriété}}`.
Le contenu des sections est également interprété.

En plus des propriétés des items, il est possible d'utiliser la propriété spéciale `ref`, comme
section, pour utiliser l'arborescence `references`. La recherche dans `references` suit les
mêmes principes que ceux de l'arborescence `explanations`.
On utilisera l'expression: `{{#ref}}indication{{/ref}}`.
