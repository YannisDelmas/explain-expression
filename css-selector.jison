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
\d+                      return 'INTEGER';
'#'                      return '#';
","                      return ',';
"."                      return '.';
"["                      return '[';
"]"                      return ']';
"="                      return '=';
\:("not"|"where"|"is")\( return 'LOGICAL_ABSOLUTE';
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
"|"                      return '|';
\s+                      return 'S';
<<EOF>>                  return 'EOF';


/lex

/* operator associations and precedence */

%start expressions

%% /* language grammar */

expressions
    : selector_list EOF
        { return $1;}
    ;

selector_list
    : selector_list (comma selector)
        { $1.selectors.push($3); $1.type='logical'; $1.name='selector_list'; $$ = $1 }
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
        { $$ = yy.create({ type: 'combinator_selector', combinator: 'child', left: $1, right: $3 }) }
    | selector S simple_selector
        { $$ = yy.create({ type: 'combinator_selector', combinator: 'descendant', left: $1, right: $3 }) }
    | selector padded_tilde simple_selector
        { $$ = yy.create({ type: 'combinator_selector', combinator: 'subsequent_sibling', left: $1, right: $3 }) }
    | selector padded_plus simple_selector
        { $$ = yy.create({ type: 'combinator_selector', combinator: 'next_sibling', left: $1, right: $3 }) }
    ;

namespace_prefix
    : ident '|'       { $$ = $1 }
    |  '*'  '|'       { $$ = $1 }
    ;

namespace_prefix_ident
    : namespace_prefix ident
        { $$ = yy.create({type: 'namespace_prefix_ident', namespace: $1, ident: $2}) }
    | ident
        { $$ = yy.create({type: 'namespace_prefix_ident', namespace: '', ident: $1}) }
    ;

element
    : namespace_prefix_ident
        {
            $$ = yy.create({ type: 'element', name: $1.ident, constraints: [] });
            if ( $1.namespace == '*' ) $$.universal_namespace = true;
            else if ( $1.namespace != '' ) $$.namespace = $1.namespace;
        }
    | namespace_prefix '*'
        {
            $$ = yy.create({ type: 'universal', constraints: [] });
            if ( $1 == '*' ) $$.universal_namespace = true;
            else $$.namespace = $1;
        }
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
    |   pseudo
    |   attrib
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
    : '[' padded_namespace_prefix_ident ']'
        { $$ = yy.create({ type: 'attribute', subtype: 'has_attribute', name: $2 }) }
    | '[' padded_namespace_prefix_ident '=' padded_ident_or_string ']'
        { $$ = yy.create({ type: 'attribute', subtype: 'attribute_equals', name: $2, value: $4 }) }
    | '[' padded_namespace_prefix_ident SUBSTRINGMATCH padded_ident_or_string ']'
        { $$ = yy.create({ type: 'attribute', subtype: 'attribute_contains', name: $2, value: $4 }) }
    | '[' padded_namespace_prefix_ident DOES_NOT_CONTAIN padded_ident_or_string ']'
        { $$ = yy.create({ type: 'attribute', subtype: 'attribute_does_not_contain', name: $2, value: $4 }) }
    | '[' padded_namespace_prefix_ident INCLUDES padded_ident_or_string ']'
        { $$ = yy.create({ type: 'attribute', subtype: 'attribute_contains_word', name: $2, value: $4 }) }
    | '[' padded_namespace_prefix_ident DASHMATCH padded_ident_or_string ']'
        { $$ = yy.create({ type: 'attribute', subtype: 'attribute_contains_prefix', name: $2, value: $4 }) }
    | '[' padded_namespace_prefix_ident PREFIXMATCH padded_ident_or_string ']'
        { $$ = yy.create({ type: 'attribute', subtype: 'attribute_starts_with', name: $2, value: $4 }) }
    | '[' padded_namespace_prefix_ident SUFFIXMATCH padded_ident_or_string ']'
        { $$ = yy.create({ type: 'attribute', subtype: 'attribute_ends_with', name: $2, value: $4 }) }
    ;

padded_namespace_prefix_ident
    : S namespace_prefix_ident S
        { $$ = $2 }
    | S namespace_prefix_ident
        { $$ = $2 }
    | namespace_prefix_ident S
        { $$ = $1 }
    | namespace_prefix_ident
        { $$ = $1 }
    ;

padded_ident_or_string
    : S ident S
        { $$ = $2 }
    | S ident
        { $$ = $2 }
    | ident S
        { $$ = $1 }
    | ident
        { $$ = $1 }
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
    : LOGICAL_ABSOLUTE selector_list ')'
        { $$ = yy.create({ type: 'logical', name: $1.substring(1,$1.length-1), args: $2 }) }
    | ':' ident '(' ')'
        { $$ = yy.create({ type: 'pseudo_func', name: $2 }) }
    | ':' ident '(' integer ')'
        { $$ = yy.create({ type: 'pseudo_func', name: $2, args: $4 }) }
    | ':' ident '(' an_plus_b ')'
        { $$ = yy.create({ type: 'pseudo_func', name: $2, args: $4 }) }
    | ':' ident '(' IDENT ')' 
        {
            /* un identificateur autre que 'n', qui est déjà dans an_plus_b */
            $$ = { type: 'pseudo_func', name: $2,
                args: ['odd', 'even', 'ltr', 'rtl'].includes($4)? yy.create({type: $4}): $4
            }
        }
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
        { $$ = yy.create({ type: 'an_plus_b', a: $1, b: Number($3) }) }
    | integer_n '-' INTEGER
        { $$ = yy.create({ type: 'an_plus_b', a: $1, b: -Number($3) }) }
    | integer_n
        { $$ = yy.create({ type: 'an_plus_b', a: $1, b: 0 }) }
    ;