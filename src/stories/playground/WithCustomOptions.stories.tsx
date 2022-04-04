import { Story } from "@storybook/react"
import { useMemo, useState } from "react";
import CodeEditor from "../resources/code-editor/CodeEditor"
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { basicSetup } from "@codemirror/basic-setup"
import {preventModifyTargetRanges, smartDelete, smartPaste} from '../../lib/index'

enum ReadOnlyRangesExtensionOption {
  preventModifyTargetRanges = 'preventModifyTargetRanges',
  smartPaste = 'smartPaste', 
  smartDelete = 'smartDelete'
}

export default {
    title: 'Playground/0. Basic Usage',
    argTypes:{
      readOnlyExtensionOption:{
        control: {
          type: 'check',
          options:  [ReadOnlyRangesExtensionOption.preventModifyTargetRanges,
          ReadOnlyRangesExtensionOption.smartDelete,
          ReadOnlyRangesExtensionOption.smartPaste],
        },
      }
    }
    };



export const WithCustomOptions: Story<{readOnlyExtensionOption:Array<ReadOnlyRangesExtensionOption>}> = ({readOnlyExtensionOption}) => {

        const initialCode = 
        `import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
        
export const themeOptions: ThemeOptions = {
        palette: {
          type: 'light',
        },
        overrides: {
        },
};`

      const [code, setCode] = useState<string>('');
      
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
        setCode(view.state.doc.toString());
      }
      
      const targetExtensions = useMemo(() => {
        let extension = [basicSetup];
        if(readOnlyExtensionOption.includes(ReadOnlyRangesExtensionOption.preventModifyTargetRanges)){
          extension = [...extension, preventModifyTargetRanges(getReadOnlyRanges)];
        }
        if(readOnlyExtensionOption.includes(ReadOnlyRangesExtensionOption.smartPaste)){
          extension = [...extension, smartPaste(getReadOnlyRanges)];
        }
        if(readOnlyExtensionOption.includes(ReadOnlyRangesExtensionOption.smartDelete)){
          extension = [...extension, smartDelete(getReadOnlyRanges)];
        }

        return extension;
      },[readOnlyExtensionOption])

      return (<>
      <CodeEditor onView={setView} initialDocValue={initialCode} extensions={targetExtensions} />
      <button onClick={handleOnSave}>Get Code</button>
      <h2>Code:</h2>
      {code}
      </>)
      }

    WithCustomOptions.args = {
      readOnlyExtensionOption:[
        ReadOnlyRangesExtensionOption.preventModifyTargetRanges,
        ReadOnlyRangesExtensionOption.smartDelete,
        ReadOnlyRangesExtensionOption.smartPaste
      ]
    };



    