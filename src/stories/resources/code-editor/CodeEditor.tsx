import React, { useEffect, useMemo, useRef, useState } from 'react';
import { EditorState, StateEffect } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { ICodeEditor } from './ICodeEditor';
import { useFirstRender } from '../custom-hook/useFirstRender';

const CodeEditor:React.FC<ICodeEditor> = ({onView, extensions = [], initialDocValue}) => {

const [editorView, setEditorView] = useState<EditorView | null>(null)
    
const isFirstRender = useFirstRender();

const editorRef = useRef<HTMLElement>(null);

const targetExtensions = useMemo(() => {
    return Array.isArray(extensions) ? extensions : []
    }, [extensions])


useEffect(() => {
      if (isFirstRender || !editorView) return

      editorView.dispatch({
        effects: StateEffect.reconfigure.of(targetExtensions),
      })
    }, [targetExtensions])

useEffect(() => {
    if(editorRef.current === null) return;

    const view = new EditorView({
      state: EditorState.create(
        {
          doc: initialDocValue,
          extensions:[...Array.of(extensions)],
        }
      ),
      parent: editorRef.current,
    });
    
    setEditorView(view);
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
