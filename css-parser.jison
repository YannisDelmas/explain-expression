/* description: Parses css selectors. */
/* D'après https://github.com/featurist/bo-selector */
/* A adapter pour mieux se conformer à https://www.w3.org/TR/selectors-3/#grammar */
/* produire avec : http://zaa.ch/jison/try/ */

/* lexical grammar */
%lex
%options case-insensitive

%%

'n'                      return 'n';
[_a-zA-Z][_a-zA-Z0-9-]*  return 'IDENT';
\~\=                     return 'INCLUDES';
\*\=                     return 'SUBSTRINGMATCH';
"|="                     return 'DASHMATCH';
"!="                     return 'DOES_NOT_CONTAIN';
"^="                     return 'PREFIXMATCH';
"$="                     return 'SUFFIXMATCH';
\"[^\n\r\f\\"]*\"        return 'SINGLE_QUOTED_STRING';
\'[^\n\r\f\\']*\'        return 'DOUBLE_QUOTED_STRING';
/*
\+\d+                    return 'POSITIVE_INTEGER';
\-\d+                    return 'NEGATIVE_INTEGER';
*/
\d+                      return 'INTEGER';
'(odd)'                  return 'ODD_ARGUMENT';
"(even)"                 return 'EVEN_ARGUMENT';
'#'                      return '#';
","                      return ',';
"."                      return '.';
"["                      return '[';
"]"                      return ']';
"="                      return '=';
":not("                  return 'NOT';
"::"                     return 'DOUBLE_COLON';
":"                      return ':';
"("                      return '(';
")"                      return ')';
">"                      return '>';
"'"                      return "'";
"*"                      return '*';
"~"                      return '~';
"+"                      return '+';
"-"                      return '-';
\s+                      return 'S';
<<EOF>>                  return 'EOF';


/lex

/* operator associations and precedence */

%start expressions

%% /* language grammar */

expressions
    : selectors_group EOF
        { return $1;}
    ;

selectors_group
    : selectors_group (comma selector)
        { $1.selectors.push($3); $1.type = 'selectors_group'; $$ = $1 }
    | selector
        { $$ = yy.create({ type: 'simple_selector_sequence', selectors: [$1] }) }
    ;

comma
    : ','
    | ',' S
    ;

selector
    : combinator_selector DOUBLE_COLON ident
        { $$ = yy.create({ type: 'pseudo_element', name: $3, subject: $1 }) }
    | simple_selector DOUBLE_COLON ident
        { $$ = yy.create({ type: 'pseudo_element', name: $3, subject: $1 }) }
        /* Note CSS3 :
            Only one pseudo-element may appear per selector, and if present it must appear after the sequence
            of simple selectors that represents the subjects of the selector. Note: A future version of this
            specification may allow multiple pseudo-elements per selector.
        */
    | combinator_selector
    | simple_selector
    ;

simple_selector
    : element constraint_list
        { $1.constraints = $2.constraints; $$ = $1 }
    | element
    | constraint_list
        { $$ = yy.create({ type: 'constraint_list', constraints: $1.constraints }) }
    ;

combinator_selector
    : selector padded_child_combinator simple_selector
        { $$ = yy.create({ type: 'combinator_selector', left: $1, right: $3, combinator: 'child' }) }
    | selector S simple_selector
        { $$ = yy.create({ type: 'combinator_selector', left: $1, right: $3, combinator: 'descendant' }) }
    | selector padded_tilde simple_selector
        { $$ = yy.create({ type: 'subsequent_sibling', left: $1, right: $3 }) }
    | selector padded_plus simple_selector
        { $$ = yy.create({ type: 'next_sibling', left: $1, right: $3 }) }
    ;

element
    : ident
        { $$ = yy.create({ type: 'element', name: $1, constraints: [] }) }
    | '*'
        { $$ = yy.create({ type: 'universal', name: $1, constraints: [] }) }
    ;

constraint_list
    : constraint_list constraint
        { $1.constraints.push($2); $$ = $1 }
    | constraint
        { $$ = yy.create({ type: 'constraint_list', constraints: [$1] }) }
    ;

constraint
    :   class
    |   hash
    |   attrib
    |   pseudo
    ;

class
    : '.' ident
        { $$ = { type: 'class', name: $2 } }
    ;

hash
    : '#' ident
        { $$ = { type: 'id', name: $2 } }
    ;

ident
    : IDENT
    | n
    ;

attrib
    : '[' padded_ident ']'
        { $$ = yy.create({ type: 'has_attribute', name: $2 }) }
    | '[' padded_ident '=' padded_ident_or_string ']'
        { $$ = yy.create({ type: 'attribute_equals', name: $2, value: $4 }) }
    | '[' padded_ident SUBSTRINGMATCH padded_ident_or_string ']'
        { $$ = yy.create({ type: 'attribute_contains', name: $2, value: $4 }) }
    | '[' padded_ident DOES_NOT_CONTAIN padded_ident_or_string ']'
        { $$ = yy.create({ type: 'attribute_does_not_contain', name: $2, value: $4 }) }
    | '[' padded_ident INCLUDES padded_ident_or_string ']'
        { $$ = yy.create({ type: 'attribute_contains_word', name: $2, value: $4 }) }
    | '[' padded_ident DASHMATCH padded_ident_or_string ']'
        { $$ = yy.create({ type: 'attribute_contains_prefix', name: $2, value: $4 }) }
    | '[' padded_ident PREFIXMATCH padded_ident_or_string ']'
        { $$ = yy.create({ type: 'attribute_starts_with', name: $2, value: $4 }) }
    | '[' padded_ident SUFFIXMATCH padded_ident_or_string ']'
        { $$ = yy.create({ type: 'attribute_ends_with', name: $2, value: $4 }) }
    ;

padded_ident
    : S ident S
        { $$ = $2 }
    | S ident
        { $$ = $2 }
    | ident S
        { $$ = $1 }
    | ident
        { $$ = $1 }
    ;

padded_ident_or_string
    : padded_ident
    | S string S
        { $$ = $1 }
    | S string
        { $$ = $2 }
    | string S
        { $$ = $1 }
    | string
        { $$ = $1 }
    ;

padded_child_combinator
    : S '>' S
    | S '>'
    | '>' S
    | '>'
    ;

padded_tilde
    : S '~' S
    | S '~'
    | '~' S
    | '~'
    ;

padded_plus
    : S '+' S
    | S '+'
    | '+' S
    | '+'
    ;

string
    : SINGLE_QUOTED_STRING
        { $$ = $1.substr(1, $1.length - 2) }
    | DOUBLE_QUOTED_STRING
        { $$ = $1.substr(1, $1.length - 2) }
    ;

pseudo
    : NOT selectors_group ')'
        { $$ = { type: 'negation', args: $2 } }
        /*  Règle pour le :not() façon CSS4 (en CSS3, seulement sélecteur simple).
            Ne devrait pas être autorisé pour les autres functional_pseudo.
         */
    | ':' ident ODD_ARGUMENT
        { $$ = { type: 'pseudo_func', name: $2, args: { type: 'odd' } } }
    | ':' ident EVEN_ARGUMENT
        { $$ = { type: 'pseudo_func', name: $2, args: { type: 'even' } } }
    | ':' ident '(' an_plus_b ')'
        { $$ = { type: 'pseudo_func', name: $2, args: $4 } }
    | ':' ident '(' integer ')'
        { $$ = { type: 'pseudo_func', name: $2, args: $4 } }
    | ':' ident '(' ')'
        { $$ = { type: 'pseudo_func', name: $2 } }
    | ':' ident
        { $$ = yy.create({ type: ['first-line','first-letter','before','after'].includes($2)?'pseudo_element_old':'pseudo_class', name: $2 }) }
    ;

integer
    : INTEGER
        { $$ = Number($1); }
    | '+' INTEGER
        { $$ = Number($2); }
    | '-' INTEGER
        { $$ = - Number($2); }
    ;
integer_n
    : 'n'
        { $$ = 1; }
    | '+' 'n'
        { $$ = 1; }
    | '-' 'n'
        { $$ = -1; }
    | integer 'n'
        { $$ = $1; }
    ;
an_plus_b
    /* https://www.w3.org/TR/selectors-3/#nth-child-pseudo */
    : integer_n '+' INTEGER
        { $$ = { type: 'an_plus_b', a: $1, b: Number($3) } }
    | integer_n '-' INTEGER
        { $$ = { type: 'an_plus_b', a: $1, b: -Number($3) } }
    | integer_n
        { $$ = { type: 'an_plus_b', a: $1, b: 0 } }
    ;