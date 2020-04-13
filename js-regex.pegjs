// From https://gitlab.com/javallone/regexper-static/-/blob/master/src/js/parser/javascript/grammar.peg
//	MIT LICENCE
// test -> https://pegjs.org/online
// cf. https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_r%C3%A9guli%C3%A8res

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

anchor = "^" { return {type:'anchor', name: 'begin'}; }
       / "$" { return {type:'anchor', name:  'end' }; }

match_fragment = content:( anchor / group / lookahead / charset / terminal ) repeat:repeat?
    { return Object.assign(repeat?repeat:{}, {type: 'match_fragment', content: content}); }

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
      { return {type: 'repeat', repeat: 'minmax', repeat_min:parseInt(min.join('')), repeat_max:parseInt(max.join(''))}; }
    / "{" min:[0-9]+ ",}"
      { return {type: 'repeat', repeat: 'min', repeat_min:parseInt(min.join(''))}; }
    / "{" exact:[0-9]+ "}"
      { return {type: 'repeat', repeat: 'exact', repeat_exact:parseInt(exact.join(''))}; }

lookahead = "(" modality:( "?=" / "?!" ) content:regexp ")"
    {return {type: 'lookahead', content: content, modality:modality}; }

group = "(" capture:( "?:" )? content:regexp ")"
    {return {type: 'group', content: content, capture: capture!='?:'}; }

// suite à traiter

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
