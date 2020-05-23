<?php

$interface = Array(
	'title' => 'Explique une expression JavaScript simple',
	'docTitle' => 'Explique une expression JavaScript simple (expérimental)',
	'info' => '
		<p>
			<a href="'. dirname($_SERVER['PHP_SELF']). '/"><span class="fa fa-cubes"></span> Explique un sélecteur CSS</a>
			<a href="?module=js-regexp"><span class="fa fa-cubes"></span> Explique une expression régulière</a>
		</p>
		<p>
			(à rédiger)
		</p>
	',
	'placeholder' => 'expression JavaScript à expliquer',
	'explain' => 'expliquer',
	'examples' => '
		<p>Exemples&nbsp;:</p>
		<ul>
			<li>
				Littéraux&nbsp;:
				<code class="exemple">/a(b)*c?/ig</code>,
				<code class="exemple">\'lorem ipsum\'</code>,
				<code class="exemple">`lorem ${expression} ipsum`</code>,
				<code class="exemple">1234.56789</code>,
				<code class="exemple">3.17E9</code>,
				<code class="exemple">true</code>,
				<code class="exemple">false</code>,
				<code class="exemple">null</code>,
				<code class="exemple">undefined</code>.
			</li>
			<li>
				(à rédiger)&nbsp;:
				<code class="exemple">TODO</code>
			</li>
		</ul>
	',
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
		</p>',
);

include("js-regexp-page.php");