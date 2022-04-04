import { Story } from "@storybook/react"
import { useState } from "react";
import CodeEditor from "../resources/code-editor/CodeEditor"
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import readOnlyRangesExtension from '../../lib/index'
import { extensions } from "../resources/code-editor/extensions";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

export default {
    title: 'Playground/1. Adding More Extensions',
    };

export const MoreExtensions:Story = () => {

const initialCode = 
      `import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
      
export const themeOptions: ThemeOptions = {
      palette: {
        type: 'light',
      },
      overrides: {
      },
};`

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

const [view, setView] = useState<EditorView | null>(null);
const [code, setCode] = useState<string>('');

const handleOnSave = (event:React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  if (view === null) return;
  setCode(view.state.doc.toString());
}

const fixedHeightEditor = EditorView.theme({
  "&": {height: "200px"},
  ".cm-scroller": {overflow: "auto"},
  ".cm-content, .cm-gutter": {minHeight: "200px"}
})

return (<>

<CodeEditor onView={setView} initialDocValue={initialCode} extensions={[...Array.of(extensions), javascript(), oneDark, EditorView.lineWrapping, fixedHeightEditor, readOnlyRangesExtension(getReadOnlyRanges)]} />
<button onClick={handleOnSave}>Get Code</button>
<h2>Code:</h2>
{code}
</>)
}



    