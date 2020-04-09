// From https://gitlab.com/javallone/regexper-static/-/blob/master/src/js/parser/javascript/grammar.peg
//	MIT LICENCE
// test -> https://pegjs.org/online
// cf. https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_r%C3%A9guli%C3%A8res

root = "/" expr:regexp "/" flags:([yigmu]*)
      {
        let d = { type: 'regular_expression', expr: expr };
        if ( flags.includes('y') ) d.sticky = true;
        if ( flags.includes('i') ) d.ci = true;
        if ( flags.includes('g') ) d.global = true;
        if ( flags.includes('m') ) d.multiline = true;
        if ( flags.includes('u') ) d.unicode = true;
        return d;
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


anchor = "^" { return {type:'anchor', name: 'begin'}; }
       / "$" { return {type:'anchor', name:  'end' }; }

// suite à traiter

match_fragment = content:( anchor / subexp / charset / terminal ) repeat:repeat?
  {return 'TODO'; }

  repeat = spec:( repeat_any / repeat_required / repeat_optional / repeat_spec ) greedy:"?"?
  
  repeat_any = "*" 
  
  repeat_required = "+" 
  
  repeat_optional = "?"
  
  repeat_spec = ( "{" min:[0-9]+ "," max:[0-9]+ "}"
                 / "{" min:[0-9]+ ",}"
                 / "{" exact:[0-9]+ "}" )

  subexp = "(" capture:( "?:" / "?=" / "?!" )? regexp ")"
  charset = "[" invert:"^"? parts:( charset_range / charset_terminal )* "]"
  charset_range = first:charset_range_terminal "-" last:charset_range_terminal 
  charset_terminal = charset_escape 
                    / charset_literal 
  charset_range_terminal = charset_range_escape 
                          / charset_literal
  charset_escape = "\\" esc:(
         code:[bdDfnrsStvwW] arg:""?
       / control_escape
       / octal_escape
       / hex_escape
       / unicode_escape
       / null_escape )
  charset_range_escape = "\\" esc:(
         code:[bfnrtv] arg:""?
       / control_escape
       / octal_escape
       / hex_escape
       / unicode_escape
       / null_escape )
  charset_literal = ( ""? literal:[^\\\]] )
                   / ( literal:"\\" &"c" )
                   / ( "\\" literal:[^bdDfnrsStvwW] )
  terminal = "."
            / escape 
            / literal 
  escape = "\\" esc:(
         code:[bBdDfnrsStvwW1-9] arg:""?
       / control_escape
       / octal_escape
       / hex_escape
       / unicode_escape
       / null_escape )
  literal = ( ""? literal:[^|\\/.\[\(\)?+*$^] )
           / ( literal:"\\" &"c" )
           / ( "\\" literal:. )

  control_escape = code:"c" arg:[a-zA-Z]
  octal_escape = code:"0" arg:[0-7]+
  hex_escape = code:"x" arg:( [0-9a-fA-F] [0-9a-fA-F] )
  unicode_escape = code:"u" arg:( [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] )
  null_escape = code:"0" arg:""?
