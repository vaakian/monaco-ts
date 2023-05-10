import { Editor } from '@monaco-editor/react';
import { setupEditor } from './setupEditor';
import defaultContent from './defaultContent?raw';
import { memo } from 'react';
const TheEditor = memo(() => {
  return (
    <Editor
      value={defaultContent}
      className="editor"
      language="typescript"
      defaultPath="index.tsx"
      path="index.tsx"
      onMount={setupEditor}
      options={{
        lineNumbers: 'off',
        minimap: { enabled: false },
        scrollbar: { horizontal: 'hidden', vertical: 'hidden' },
        overviewRulerLanes: 0,
        // renderLineHighlight: 'none',
        renderLineHighlightOnlyWhenFocus: true,
      }}
    />
  );
});

export default TheEditor;
