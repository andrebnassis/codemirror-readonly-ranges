# CodeMirror ReadOnly Ranges Extension

This library aims to help you dealing with readonly ranges on Codemirror

## Installation
https://www.npmjs.com/package/codemirror-readonly-ranges

```bash

//Using npm
npm install codemirror-readonly-ranges range-analyzer

//Using yarn
yarn add codemirror-readonly-ranges range-analyzer

```
## Using the extension

First, you need to define a function that returns an array of readonly ranges.

In the example above we are defining the following readonly ranges:

 - from 0 until the last position of the 3ed line
 - from the last line beggining until the last position of the last line
 ```typescript

import { EditorState } from '@codemirror/state';

const getReadOnlyRanges = (targetState:EditorState):Array<{from:number|undefined, to:number|undefined}> => {
  return [
    {
   from: undefined, //same as targetState.doc.line(0).from or 0
   to: targetState.doc.line(3).to
  },
  {
    from: targetState.doc.line(targetState.doc.lines).from, 
    to: undefined // same as targetState.doc.line(targetState.doc.lines).to
  }
  ]
}

 ```

 ```typescript
 import readOnlyRangesExtension from 'codemirror-readonly-ranges'

 ...
 extensions=[readOnlyRangesExtension(getReadOnlyRanges)]
 ...

 ```
 
# CONTRIBUITING

Check out [CONTRIBUTING.md](CONTRIBUTING.md) to understand more about the project internals and how to contribute to it.