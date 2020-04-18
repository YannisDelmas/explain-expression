// test -> https://pegjs.org/online
// reference: https://www.ecma-international.org/ecma-262/10.0/index.html#sec-regexp-regular-expression-objects
// cf. https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_r%C3%A9guli%C3%A8res

{
  function readInt(list) { return parseInt(list.join('')); }
}

RegularExpression = "/" pattern:Pattern "/" flags:([gimsuy]*)
    {
      return {
        type: 'RegularExpression',
        pattern: pattern, flags: flags.join(''),
        global: flags.includes('g'),
        ignoreCase: flags.includes('i'),
        multiline: flags.includes('m'),
        dotAll: flags.includes('s'),
        unicode: flags.includes('u'),
        sticky: flags.includes('y')
      };
    }

Pattern = first:Alternative alternatives:( "|" Alternative )*
    {
      if ( alternatives.length == 0 )
        return first;
      alternatives = alternatives.map(x => x[1]);
      alternatives.unshift(first);
      return {type: 'Disjunction', alternatives: alternatives};
    }

Alternative
  = first:Term terms:Term+
    { terms.unshift(first); return {type:'TermList', terms: terms}; }
  / term:Term
    { return term; }
  / ""
    { return {type:'Empty'}; }

Term
  = Assertion
  / atom:Atom quantifier:Quantifier
    { quantifier.term = atom; return quantifier; }
  / Atom

// assertions

Assertion
  = "^" { return {type:'Assertion', name:'anchor_begin'}; }
  / "$" { return {type:'Assertion', name:'anchor_end' }; }
  / "\\b" { return {type:'Assertion', name:'word_boundary'}; }
  / "\\B" { return {type:'Assertion', name:'non_word_boundary'}; }
  / "(" modality:( "?=" / "?!" ) content:Pattern ")"
    { return {type:'Assertion', name:'lookahead', content: content, invert:(modality=='?!')}; }
  / "(" modality:( "?<=" / "?<!" ) content:Pattern ")"
    { return {type:'Assertion', name:'lookbehind', content: content, invert:(modality=='?<!')}; }

// quantifiers

Quantifier
  = prefix:QuantifierPrefix greedy:"?"
    { prefix.repeatNonGreedy= true; return prefix; }
  / QuantifierPrefix

QuantifierPrefix
  = "*"   { return {type:'Quantifier', repeat:'any', repeatMin:0}; }
  / "+"   { return {type:'Quantifier', repeat:'required', repeatMin:1}; }
  / "?"   { return {type:'Quantifier', repeat:'optional', repeatMin:0, repeatMax:1}; }
  / "{" exact:[0-9]+ "}"
    {
      let n = readInt(exact);
      return {type:'Quantifier', repeat:'exact', repeatMin:n, repeatMax:n};
    }
  / "{" min:[0-9]+ ",}"
    { return {type:'Quantifier', repeat:'min', repeatMin:readInt(min)}; }
  / "{" min:[0-9]+ "," max:[0-9]+ "}"
    { return {type:'Quantifier', repeat:'minmax', repeatMin:readInt(min), repeatMax:readInt(max)}; }

// atoms

Atom
  = PatternCharacter
  / "."  { return {type: 'CharacterSet', code:'any'}; }
  / "\\" esc:AtomEscape { return esc; }
  / CharacterClass
  / Group

// groups

Group
  = "(" capture:( "?:" )? content:Pattern ")"
    {
      capture = (capture!='?:');
      return {type:'Group', content: content, capture: capture, number: capture?compteur:null };
    }
  / "(?" name:GroupName content:Pattern ")"
    { return {type:'Group', name: name.value, content: content, capture: true, number: compteur}; }

GroupName
  = "<" name1:[^!-#%-@] name2:[^!-#%-/:-@]+ ">"
    { return {type:'GroupName', value: name1+name2.join('')}; }

  // RegExpIdentifierName = RegExpIdentifierStart RegExpIdentifierPart*
  // RegExpIdentifierStart is unicode ID_Start, $, _ or escape sequence
  // RegExpIdentifierPart is unicode ID_Continue, $, _ or escape sequence
  // Today (2020-04-15) \p{ID_Start} is not yet implemented to test
  // the property. Another mean would be to try the identifier, but groups
  // are not yet implemented everywhere. So we simplify the expression.

// character classes

CharacterClass
  = "[" invert:"^"? parts:ClassRanges "]"
    { return {type: 'CharacterClass', parts: parts, invert:(invert=="^")}; }

ClassRanges
  = NonemptyClassRanges
  / ""  { return []; }

NonemptyClassRanges
  = begin:ClassAtom "-" end:ClassAtom ranges:ClassRanges
    {
      ranges.unshift({type: 'CharacterRange', begin: begin, end: end});
      return ranges;
    }
  / first:ClassAtom ranges:NonemptyClassRangesNoDash
    { ranges.unshift(first); return ranges; }
  / first:ClassAtom
    { return [first]; }

NonemptyClassRangesNoDash
  = begin:ClassAtomNoDash "-" end:ClassAtom ranges:ClassRanges
    {
      ranges.unshift({type: 'CharacterRange', begin: begin, end: end});
      return ranges;
    }
  / first:ClassAtomNoDash ranges:NonemptyClassRangesNoDash
    { ranges.unshift(first); return ranges; }
  / first:ClassAtom
    { return [first]; }

ClassAtom
  = ClassAtomNoDash
  / '-'    { return {type:'Litteral', value: '-'}; }

ClassAtomNoDash
  = "\\" value:ClassEscape
    { return value; }
  / literal:[^-\\\]]
    { return {type:'Litteral', value: literal}; }

ClassEscape
  = "b"
    { return {type:'ControlEscape', code: 'b'}; }
  / "-"
    { return {type:'Litteral', value: '-'}; }
  / CharacterClassEscape
  / CharacterEscape

// litterals

PatternCharacter
  = literal:[^/^$\\.*+?()[\]{}|]
    { return {type:'Litteral', value: literal}; }

AtomEscape
  = code:([1-9] [0-9]*)
    { return {type: 'GroupReference', number: parseInt(code)}; }
  / "k" name:GroupName
    { return {type: 'GroupReference', name: name.value}; }
  / CharacterClassEscape
  / CharacterEscape

CharacterClassEscape
  = code:[dDsSwW]
    { return {type:'CharacterSet', code: code}; }
  // to add later : p{UnicodePropertyValueExpression}

CharacterEscape
  = code:[fnrtv]
    { return {type:'ControlEscape', code: code}; }
  / "c" code:[a-zA-Z]
    { return {type:'ControlCharacter', control: code.toUpperCase(), code: code.charCodeAt()-64}; }
  / "0" (! [0-9])
    { return {type:'Litteral', name: 'NUL'}; }
  / "x" code:([0-9A-Fa-f] [0-9A-Fa-f])
    { return {type:'HexEscape', code: code.join('').toUpperCase()}; }
  / "u" code:( [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] )
    { return {type:'UnicodeEscape', code: code.join('').toUpperCase()}; }
  / "u{" code:( [0-9a-fA-F]+ ) "}"
    { return {type:'UnicodeEscape', code: code.join('').toUpperCase()}; }
  / char:.
    { return {type:'Litteral', value: char}; }
