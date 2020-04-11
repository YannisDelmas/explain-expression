<?php
/**
 * Explique une expression.
 *
 * Application pédagogique pour expliquer les expressions de différents langages informatiques.
 * Pour l'instant, l'application ne traite que les sélecteurs CSS3, en français. Le projet
 * s'appuie sur une grammaire (jison) des expressions.
 * 
 * @author	Yannis Delmas
 */

/* Initialisations */
$lang = 'fr';
$module = 'css-selector';
include("{$module}-page.{$lang}.php");

/* Encodage */
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="<?= $lang ?>">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?= $interface['title'] ?></title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha256-eZrrJcwDc/3uDhsdt61sL2oOBY362qM3lon1gyExkL0=" crossorigin="anonymous" />
	<link rel="stylesheet" href="explain-expression.css">
</head>
<body class="module-<?= $module ?>">
	<header>
		<h1><?= $interface['docTitle'] ?></h1>
		<div class="chapeau"><?= $interface['info'] ?></div>
	</header>
	<main>
		<form action="javascript:analyse()">
			<div class="input-group">
				<input type="text" name="expression" id="expression" placeholder="<?= $interface['placeholder'] ?>">
				<button type="submit" id="expliquer"><span class="fa fa-cog"></span> <?= $interface['explain'] ?></button>
			</div>
		</form>
		<div class="explication">
			<output><p>&nbsp;</p></output>	
		</div>
	</main>
	<section class="exemples"><?= $interface['examples'] ?></section>
	<footer>
		<p class="message">
			Les contributeurs sont les bienvenus pour ajouter d'autres types d'expressions
			(par exemple les expressions régulières)
			ou pour traduire les explications dans d'autres langues.
			<br><span class="fa-language fa"></span><i lang="en">Contributors are welcome to add
			other types of expressions or to translate the explanations into other languages.</i>
		</p>
		<?= $interface['footer'] ?>
	</footer>
	<script src="<?= $module ?>-page.js"></script>
	<script>
		var JSlang = <?= json_encode($interface['JSlang']) ?>;
		document.addEventListener('DOMContentLoaded', function(){
			// `expression` est la case de texte contenant l'expression à analyser
			let expression = document.getElementById('expression');
			// elle a d'emblée le focus
			expression.focus();
			// les exemples remplissent automatiquement `expression` et lancent l'analyse
			document.querySelectorAll('.exemple').forEach(function(item) {
				item.addEventListener('click', function(){
					expression.value = this.innerText;
					analyse();
				});
			})
		});
	</script>
</body>
</html>