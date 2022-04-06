import { Story } from "@storybook/react"
import CodeEditor from "./resources/CodeEditor"
import readOnlyRangesExtension from '../lib/index'
import { EditorState } from "@codemirror/state";
import { basicSetup } from "@codemirror/basic-setup"

export const ReactSample:Story = () => {

  const initialCode = 
  `read-only line 1
  read-only line 2
  read-only line 3
<Here you can modify>
read-only line 4` 
  
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

return (<CodeEditor onView={console.log} initialDocValue={initialCode} extensions={[basicSetup, readOnlyRangesExtension(getReadOnlyRanges)]} />);
}



    