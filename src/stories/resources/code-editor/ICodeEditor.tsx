import { EditorView } from '@codemirror/view';

export interface ICodeEditor {
  onView: (view: EditorView | null) => void;
}
