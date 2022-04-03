import { Story } from "@storybook/react"
import {action} from '@storybook/addon-actions'
import { useEffect, useState } from "react";
import CodeEditor from "../resources/code-editor/CodeEditor"
import { extensions } from "../resources/code-editor/extensions";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import readOnlyRangesExtension from '../../index'

export default {
    title: 'Playground',
    
    };
    
    const Template: Story = () => {

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
      
      const fixedHeightEditor = EditorView.theme({
        "&": {height: "200px"},
        ".cm-scroller": {overflow: "auto"},
        ".cm-content, .cm-gutter": {minHeight: "200px"}
      })
      
      const [view, setView] = useState<EditorView | null>(null);
      
      const handleOnSave = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (view === null) return;
          console.log(view.state.doc.toString());
      }
      
      return (<>
      <CodeEditor onView={setView} initialDocValue={initialCode} extensions={[...Array.of(extensions), javascript(), oneDark, EditorView.lineWrapping, readOnlyRangesExtension(getReadOnlyRanges), fixedHeightEditor]} />
      <button onClick={handleOnSave}>Console.log Code</button>
      </>)
      }

    export const Playground = Template.bind({});


