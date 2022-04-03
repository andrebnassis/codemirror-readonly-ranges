import { EditorStateConfig, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

export interface ICodeEditor {
  onView: (view: EditorView | null) => void;
  initialDocValue?: EditorStateConfig['doc'];
  extensions?: Extension
}
