// From https://gitlab.com/javallone/regexper-static/-/blob/master/src/js/parser/javascript/grammar.peg
//	MIT LICENCE
// test -> https://pegjs.org/online
// cf. https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_r%C3%A9guli%C3%A8res

{
  function readInt(list) { return parseInt(list.join('')); }
}

root = "/" expr:regexp "/" flags:([yigmu]*)
      {
        return { type: 'regular_expression', expr: expr,
            sticky: flags.includes('y'),
            ci: flags.includes('i'),
            global: flags.includes('g'),
            multiline: flags.includes('m'),
            unicode: flags.includes('u')
        };
      }

regexp = match:match alternates:( "|" match )*
        {
          if ( alternates.length == 0 )
            return match;
          alternates = alternates.map(x => x[1]);
          alternates.unshift(match);
          return {type: 'alternates', branches: alternates};
        }

match = (!repeat) parts:match_fragment*
      { return {type:'match', sequence: parts}; }

match_fragment = content:( boundary / group / lookahead / lookbehind / charset / terminal ) repeat:repeat?
    { return Object.assign(repeat?repeat:{}, {type: 'match_fragment', content: content}); }

// quantifiers

repeat = spec:( repeat_any / repeat_required / repeat_optional / repeat_spec ) greedy:"?"?
    { return Object.assign(spec, {repeat_greedy: (greedy=='?')}); }
  
repeat_any = "*"
    { return {type: 'repeat', repeat: 'any', repeat_min:0}; }
  
repeat_required = "+" 
    { return {type: 'repeat', repeat: 'required', repeat_min:1}; }
  
repeat_optional = "?"
    { return {type: 'repeat', repeat: 'optional', repeat_min:0, repeat_max:1}; }
  
repeat_spec
    = "{" min:[0-9]+ "," max:[0-9]+ "}"
      { return {type: 'repeat', repeat: 'minmax', repeat_min:readInt(min), repeat_max:readInt(max)}; }
    / "{" min:[0-9]+ ",}"
      { return {type: 'repeat', repeat: 'min', repeat_min:readInt(min)}; }
    / "{" exact:[0-9]+ "}"
      { return {type: 'repeat', repeat: 'exact', repeat_exact:readInt(exact)}; }

// boundaries

boundary = anchor / word_boundary / non_word_boundary;

anchor = "^" { return {type:'anchor', name: 'begin'}; }
       / "$" { return {type:'anchor', name:  'end' }; }

word_boundary = "\\b" { return {type:'word_boundary'}; }
non_word_boundary = "\\B" { return {type:'non_word_boundary'}; }

// groups

group = "(" capture:( "?:" )? content:regexp ")"
    { return {type: 'group', content: content, capture: capture!='?:'}; }

lookahead = "(" modality:( "?=" / "?!" ) content:regexp ")"
    { return {type: 'lookahead', content: content, inverse:(modality=='?!')}; }

lookbehind = "(" modality:( "?<=" / "?<!" ) content:regexp ")"
    { return {type: 'lookbehind', content: content, inverse:(modality=='?<!')}; }

// character sets

charset = "[" invert:"^"? parts:( charset_range / charset_terminal )* "]"
    { return {type: 'character_set', parts: parts}; }

charset_range = first:charset_range_terminal "-" last:charset_range_terminal 
    { return {type: 'character_range', first: first, last: last}; }

charset_range_terminal = charset_range_escape / charset_literal
charset_terminal = charset_escape / charset_literal 

charset_escape = character_class / charset_range_escape
charset_range_escape
    = escape_char
    / control_escape
    / octal_escape
    / hex_escape
    / unicode_escape

//TODO
charset_literal = ( ""? literal:[^\\\]] )
                  / ( literal:"\\" &"c" )
                  / ( "\\" literal:[^bdDfnrsStvwW] )

// terminal, including escapes

terminal = "."  { return {type: 'any_character'}; }
          / terminal_escape 
          / literal

// TODO
literal = ( ""? literal:[^|\\/.\[\(\)?+*$^] )
          / ( literal:"\\" &"c" )
          / ( "\\" literal:. )

// escapes

terminal_escape
      = "\\" code:[1-9] { return {type: 'group_reference',  code: parseInt(code)}; }
      / escape_char
      / character_class
      / control_escape
      / octal_escape
      / hex_escape
      / unicode_escape

escape_char    = "\\" code:[bfnrtv]  { return {type: 'escape_character',  code: code}; }
character_class= "\\" code:[dDsSwW]  { return {type: 'character_class',   code: code}; }
control_escape = "\\c" code:[a-zA-Z] { return {type: 'control_character', code: code}; }
octal_escape   = "\\0" code:[0-7]+   { return {type: 'octal_escape', code: code?(code.join('')):'0'}; }
hex_escape     = "\\x" code:( [0-9a-fA-F] [0-9a-fA-F] )
          { return {type: 'hex_escape', code: code.join('')}; }
unicode_escape = "\\u" code:( [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] )
          { return {type: 'unicode_escape', code: code.join('')}; }
