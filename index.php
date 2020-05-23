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
$lang = isset($_REQUEST['lang'])? strtr($_REQUEST['lang'], '\\/.:\'"', ''): 'fr';
$module = isset($_REQUEST['module'])? strtr($_REQUEST['module'], '\\/.:\'"', ''): 'css-selector';
$develMode = ( $_SERVER['HTTP_HOST'] != 'delmas-rigoutsos.nom.fr' );
$exprInit = isset($_REQUEST['q'])? $_REQUEST['q']: NULL;

/* Chargement des éléments PHP spécifiques */
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
	<link
		rel="stylesheet"
		href="https://unpkg.com/tippy.js@6/animations/scale.css"
	/>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha256-eZrrJcwDc/3uDhsdt61sL2oOBY362qM3lon1gyExkL0=" crossorigin="anonymous" />
	<link id="explainExpression" rel="stylesheet" href="explain-expression.css">
</head>
<body class="module-<?= $module ?>" data-module="<?= $module ?>">
	<header>
		<h1><?= $interface['docTitle'] ?></h1>
		<div class="chapeau"><?= $interface['info'] ?></div>
	</header>
	<main>
		<form action="#">
			<div class="input-group">
				<input type="text" name="expression" id="expression" placeholder="<?= $interface['placeholder'] ?>" <?= is_null($exprInit)?'':(' value="'. htmlspecialchars($exprInit). '"') ?>>
				<button type="submit" id="expliquer" disabled><span class="fa fa-support"></span> <?= $interface['explain'] ?></button>
			</div>
		</form>
		<div class="explication">
			<output><p>&nbsp;</p></output>	
		</div>
	</main>
	<section class="exemples"><?= $interface['examples'] ?></section>
	<footer>
		<div class="message">
			<?php if ( $develMode ) { ?>
			<p>
				Cette page est sur un <strong>serveur de développement</strong>,
				une <a href="https://delmas-rigoutsos.nom.fr/outils/explain-expression/"><strong>version stable</strong></a> est également disponible.
			</p>
			<?php } ?>
			<p>
				Les contributeurs sont les bienvenus pour ajouter d'autres types d'expressions
				ou pour traduire les explications dans d'autres langues.
			</p>
			<p>
				<span class="fa-language fa"></span> <i lang="en">Contributors are welcome to add
			other types of expressions or to translate the explanations into other languages.</i>
			</p>
		</div>
		<?= $interface['footer'] ?>
		<div id="tippy-template"></div>
	</footer>
	<script src="https://unpkg.com/@popperjs/core@2"></script>
	<script src="https://unpkg.com/tippy.js@6"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.1.0/mustache.min.js" integrity="sha256-MPgtcamIpCPKRRm1ppJHkvtNBAuE71xcOM+MmQytXi8=" crossorigin="anonymous"></script>
	<script>
		var config = {
			lang: '<?= $lang ?>',
			module: '<?= $module ?>',
			devel: <?= $develMode?'true':'false' ?>,
			uriApp: '<?= $_SERVER['PHP_SELF'] ?>',
			uriModule: '<?= $_SERVER['PHP_SELF'], '?module=', urlencode($module) ?>'
		};
	</script>
	<script type="module" src="<?= $module ?>-page.js"></script>
</body>
</html>