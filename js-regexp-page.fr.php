<?php

$interface = Array(
	'title' => 'Explique une expression régulière',
	'docTitle' => 'Explique une expression régulière',
	'info' => '
		<p>
			<a href="'. dirname($_SERVER['PHP_SELF']). '/"><span class="fa fa-cubes"></span> Explique un sélecteur CSS</a>
		</p>
		<p>
			Il existe de nombreux systèmes d’<em>expressions régulières</em>
			ou <em>expressions rationnelles</em>. La variante détaillée ici
			est celle du HTML&nbsp;5 et du Javascript / ECMAscript.
			La plupart des constructions listées dans les exemples sont reconnues
			par l’ensemble des systèmes d’expressions régulières.
		</p>
	',
	'placeholder' => 'RegExp à expliquer',
	'explain' => 'expliquer',
	'examples' => '
		<p>Exemples&nbsp;:</p>
		<ul>
			<li>
				Structures générales&nbsp;:
				<code class="exemple">/A/gimuy</code>,
				<code class="exemple">/A|B/</code>,
				<code class="exemple">/AB/</code>,
				<code class="exemple">/A?/</code>,
				<code class="exemple">/A*/</code>,
				<code class="exemple">/A+/</code>,
				<code class="exemple">/A{2}/</code>,
				<code class="exemple">/A{2,}/</code>,
				<code class="exemple">/A{2,4}/</code>,
				<code class="exemple">/A+?/</code>,
				<code class="exemple">/./</code>,
				<code class="exemple">/A(B)C/</code>,
				<code class="exemple">/(m).*\1/</code>,
				<code class="exemple">/^i/</code>,
				<code class="exemple">/m$/</code>,
				<code class="exemple">/\bi/</code>,
				<code class="exemple">/^A(B)?C(D)(?:EF)+(?=G)/</code>,
				<code class="exemple">/\/\.\$\(/</code>.
			</li>
			<li>
				Expressions courantes&nbsp;:
				<code class="exemple">/[a-z][a-z0-9_-]{3,16}/i</code> (nom d’utilisateur),
				<code class="exemple">/\d{2}/</code>,
				<code class="exemple">/\w+/</code> (lettres, chiffres, soulignés),
				<code class="exemple">/[\w.+-]+/</code> (possibilités de points, plus et tirets),
				<code class="exemple">/[\w.+-]+@([^\s@.]+\.)+[^\s@.]{2,}/u</code> (adresse mail),
				<code class="exemple">/(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/[\w.-]+)*\/?/i</code> (adresse web).
			</li>
			<li>
				Expressions avancées&nbsp;:
				(à compléter)
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
			Les diagrammes sont réalisés à l’aide de la biliothèque
			<a href="https://github.com/tabatkins/railroad-diagrams"><span class="fa fa-github"></span> railroad-diagrams</a>
			de Tab Atkins.
			Image de fond par H.&nbsp;Galeano,
			<a href="https://www.toptal.com/designers/subtlepatterns/full-bloom-pattern/">subtle
			patterns</a>.
		</p>',
);