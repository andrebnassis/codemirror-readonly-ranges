import React, { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import {javascript } from "@codemirror/lang-javascript"
import { oneDark } from '@codemirror/theme-one-dark';
import { ICodeEditor } from './ICodeEditor';
import { extensions } from './extensions';
import readOnlyRangesExtension from '../../../index';



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

const fixedHeightEditor = EditorView.theme({
  "&": {height: "200px"},
  ".cm-scroller": {overflow: "auto"},
  ".cm-content, .cm-gutter": {minHeight: "200px"}
})


const CodeEditor:React.FC<ICodeEditor> = ({onView}) => {

const initialCode = `import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const themeOptions: ThemeOptions = {
  palette: {
    type: 'light',
  },
  overrides: {
  },
};`

  const editorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if(editorRef.current === null) return;

    const view = new EditorView({
      state: EditorState.create(
        {
          doc: initialCode,
          extensions:[ ...Array.of(extensions), javascript(), oneDark, EditorView.lineWrapping, readOnlyRangesExtension(getReadOnlyRanges), fixedHeightEditor],
        }
      ),
      parent: editorRef.current,
    });
    
    onView(view);

    return () => {
      view.destroy();
      onView(null)
    }
  }, [])

  return (
    <section ref={editorRef}>
  
    </section>
  );
}

export default CodeEditor;
