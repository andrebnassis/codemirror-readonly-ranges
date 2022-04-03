//reference: https://github.com/codemirror/basic-setup/blob/main/src/basic-setup.ts

import {keymap, highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor} from "@codemirror/view"
import {Extension} from "@codemirror/state"
import {history, historyKeymap} from "@codemirror/history"
import {foldGutter} from "@codemirror/fold"
import {indentOnInput} from "@codemirror/language"
import {lineNumbers, highlightActiveLineGutter} from "@codemirror/gutter"
import {defaultKeymap, indentWithTab} from "@codemirror/commands"
import {bracketMatching} from "@codemirror/matchbrackets"
import {closeBrackets, closeBracketsKeymap} from "@codemirror/closebrackets"
import {highlightSelectionMatches} from "@codemirror/search"
import {autocompletion} from "@codemirror/autocomplete"
import {rectangularSelection} from "@codemirror/rectangular-selection"
import {defaultHighlightStyle} from "@codemirror/highlight"
import { commentKeymap, lineComment, lineUncomment } from "@codemirror/comment"


export const extensions: Extension = [
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    history(),
    foldGutter(),
    drawSelection(),
    dropCursor(),
    indentOnInput(),
    defaultHighlightStyle.fallback,
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    rectangularSelection(),
    highlightActiveLine(),
    highlightSelectionMatches(),
    keymap.of([
       ...closeBracketsKeymap,
      ...defaultKeymap,
       ...historyKeymap,
       ...commentKeymap,
       indentWithTab,
       {
        key: "Ctrl-k Ctrl-c",
        run: lineComment
      },
      {
        key: "Ctrl-K Ctrl-C",
        run: lineComment
      },
      {
        key: "Ctrl-k Ctrl-u",
        run: lineUncomment
      },
      {
        key: "Ctrl-K Ctrl-U",
        run: lineUncomment
      },
    ]),   
    
  ];
