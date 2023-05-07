import { Editor } from '@monaco-editor/react';
import { setupEditor } from './setupEditor';
import defaultContent from './defaultContent?raw';
export default function TheEditor() {
  return (
    <Editor
      value={defaultContent}
      height={360}
      className="editor"
      language="typescript"
      defaultPath="index.tsx"
      path="index.tsx"
      onMount={setupEditor}
      options={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        lineNumbers: false,
        minimap: { enabled: false },
        scrollbar: { horizontal: 'hidden', vertical: 'hidden' },
        overviewRulerLanes: 0,
        // renderLineHighlight: 'none',
        renderLineHighlightOnlyWhenFocus: true,
      }}
    />
  );
}