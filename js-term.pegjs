// test -> https://pegjs.org/online
// reference: TODO
// cf. TODO

{
  function readInt(list) { return parseInt(list.join('')); }
  function flatDeep(arr) {
    return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val) : val), []);
  }
}

RegularExpression = regexp:("/" Pattern "/" [gimsuy]*)
  { return root.jsTerm.create({type: 'RegularExpression', literal: flatDeep(regexp).join('')}); }

Pattern = first:Alternative alternatives:( "|" Alternative )*

Alternative
  = first:Term terms:Term+
  / term:Term
  / ""

Term
  = Assertion
  / atom:Atom quantifier:Quantifier
  / Atom

Assertion
  = "^"
  / "$"
  / "\\b"
  / "\\B"
  / "(" modality:( "?=" / "?!" ) content:Pattern ")"
  / "(" modality:( "?<=" / "?<!" ) content:Pattern ")"

Quantifier
  = prefix:QuantifierPrefix greedy:"?"
  / QuantifierPrefix

QuantifierPrefix
  = "*"
  / "+"
  / "?"
  / "{" exact:[0-9]+ "}"
  / "{" min:[0-9]+ ",}"
  / "{" min:[0-9]+ "," max:[0-9]+ "}"

Atom
  = PatternCharacter
  / "."
  / "\\" esc:AtomEscape
  / CharacterClass
  / Group

Group
  = "(" capture:( "?:" )? content:Pattern ")"
  / "(?" name:GroupName content:Pattern ")"

GroupName
  = "<" name1:[^!-#%-@] name2:[^!-#%-/:-@]+ ">"

CharacterClass
  = "[" invert:"^"? parts:ClassRanges "]"

ClassRanges
  = NonemptyClassRanges
  / ""

NonemptyClassRanges
  = begin:ClassAtom "-" end:ClassAtom ranges:ClassRanges
  / first:ClassAtom ranges:NonemptyClassRangesNoDash
  / first:ClassAtom

NonemptyClassRangesNoDash
  = begin:ClassAtomNoDash "-" end:ClassAtom ranges:ClassRanges
  / first:ClassAtomNoDash ranges:NonemptyClassRangesNoDash
  / first:ClassAtom

ClassAtom
  = ClassAtomNoDash
  / '-'

ClassAtomNoDash
  = "\\" value:ClassEscape
  / literal:[^-\\\]]

ClassEscape
  = "b"
  / "-"
  / CharacterClassEscape
  / CharacterEscape

PatternCharacter
  = literal:[^/^$\\.*+?()[\]{}|]

AtomEscape
  = code:([1-9] [0-9]*)
  / "k" name:GroupName
  / CharacterClassEscape
  / CharacterEscape

CharacterClassEscape
  = code:[dDsSwW]

CharacterEscape
  = code:[fnrtv]
  / "c" code:[a-zA-Z]
  / "0" (! [0-9])
  / "x" code:([0-9A-Fa-f] [0-9A-Fa-f])
  / "u" code:( [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] )
  / "u{" code:( [0-9a-fA-F]+ ) "}"
  / char:.
