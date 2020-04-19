<?php

$interface = Array(
	'title' => 'Explique un sélecteur CSS',
	'docTitle' => 'Explique un sélecteur CSS',
	'info' => '
		<p>
			<a href="?module=js-regexp"><span class="fa fa-cubes"></span> Explique une expression régulière</a>
		</p>
		<p>
			Cette application pédagogique explique un sélecteur CSS&nbsp;3 indiqué dans la
			case de texte ci-dessous en détaillant les sujets qu’il désigne.
		</p>
		<p>
			Rappel&nbsp;: En CSS une <em>règle</em> est une écriture du type
			«&nbsp;S { D }&nbsp;», où «&nbsp;S&nbsp;» est un <em>sélecteur</em> et
			«&nbsp;D&nbsp;» une succession de <em>déclarations</em>.
			Le sélecteur définit la liste des <em>sujets</em> à qui s’applique la règle.
			Ces sujets sont des éléments et pseudo-éléments.
			Les déclarations définissent la valeur de propiétés de cet élément.
		</p>',
	'placeholder' => 'sélecteur à expliquer',
	'explain' => 'expliquer',
	'exampleA' => 'Exemples élémentaires (CSS 1)&nbsp;:',
	'exampleB' => 'Exemples simples (CSS 2, CSS 1)&nbsp;:',
	'exampleC' => 'Exemples avancés&nbsp;:',
	'footer' => '
		<p>
			Page réalisé avec
			<span class="fa fa-heart" aria-valuetext="coeur" style="color: darkred;"></span>
			par <a href="https://delmas-rigoutsos.nom.fr/">Yannis Delmas</a>.
			<a href="https://github.com/YannisDelmas/explain-expression/"><span class="fa fa-github"></span>
			Code source</a> de cette application.
			Image de fond par H.&nbsp;Galeano,
			<a href="https://www.toptal.com/designers/subtlepatterns/full-bloom-pattern/">subtle
			patterns</a>.
			Tokenisation <a href="http://zaa.ch/jison/">Jison</a> à l’aide d’une
			<a href="css-selector.jison">grammaire</a> complète des sélecteurs CSS&nbsp;3&nbsp;;
			certaines parties sont reprises de
			<a href="https://github.com/featurist/bo-selector"><span class="fa fa-github"></span>
			bo-selector</a>.
		</p>'
);

include("css-selector-page.php");