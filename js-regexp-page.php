<?php

$css = preg_replace('/\\s+/', ' ', file_get_contents('explain-expression.css'));
preg_match('/(svg\\.railroad-diagram[^{]*\\{[^}]*\\}\\s*)+/', $css, $matches);
$css = preg_replace('/\'/', '"', $matches[0]);
$module_script = "SvgExportCss = '{$css}';";