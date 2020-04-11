<?php

$interface['examples'] = <<<EOT
<p>
	{$interface['exampleA']}
	<code class="exemple">E</code>,
	<code class="exemple">E F</code>,
	<code class="exemple">E.classe</code>,
	<code class="exemple">E:link</code>,
	<code class="exemple">E:visited</code>,
	<code class="exemple">ul li</code>,
	<code class="exemple">form.principal .expliquer</code>,
	<code class="exemple">h1, h2, h3</code>,
	<code class="exemple">ul.diapo ol li</code>,
	<code class="exemple">.item ul, ul ul, .sous-menu</code>.
</p>
<p>
	{$interface['exampleB']}
	<code class="exemple">*</code>,
	<code class="exemple">E:hover</code>,
	<code class="exemple">p.info.retrait-1re-ligne</code>,
	<code class="exemple">E > F</code>,
	<code class="exemple">section > header</code>.
	<code class="exemple">E:lang(L)</code>,
	<code class="exemple">:lang(fr) > q</code>,
	<code class="exemple">#chap42</code>.
</p>
<p>
	{$interface['exampleC']}
</p>
<ul>
<li>
	CSS 1&nbsp;:
	<code class="exemple">E#ident</code>,
	<code class="exemple">h1#chapter1, *#z98y, button.expliquer</code>,
	<code class="exemple">E:active</code>,
	<code class="exemple">E::first-letter</code>.
</li>
<li>
	CSS 2&nbsp;:
	<code class="exemple">E[abc]</code>,
	<code class="exemple">E[abc="def"]</code>,
	<code class="exemple">E + F</code>,
	<code class="exemple">h1 + [rel=up]</code>,
	<code class="exemple">E:first-child</code>,
	<code class="exemple">E:focus</code>.
</li>
<li>
	CSS 3&nbsp;:
	<code class="exemple">E[abc^="def"]</code>,
	<code class="exemple">E[abc*="def"]</code>,
	<code class="exemple">E:nth-child(odd)</code>,
	<code class="exemple">E:nth-child(3n+1)</code>,
	<code class="exemple">E:nth-of-type(2)</code>,
	<code class="exemple">E:empty</code>,
	<code class="exemple">E:active</code>,
	<code class="exemple">E:disabled</code>,
	<code class="exemple">E::before</code>,
	<code class="exemple">E ~ F</code>,
	<code class="exemple">E:not(.abc)</code>,
	<code class="exemple">[name="bascule"]:checked + label</code>,
	<code class="exemple">#s71:not(aside)</code>,
	<code class="exemple">a:link, p.citation:hover::before</code>,
	<code class="exemple">.a[b = c], c[d]:e:f(3n+2), g > h[i~="j"]</code>,
	<code class="exemple">#abc svg|circle</code>,
	<code class="exemple">[xml|lang]</code>.
</li>
</ul>
EOT;
