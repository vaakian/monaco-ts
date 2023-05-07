import { Editor } from '@monaco-editor/react';
import { JsxEmit } from 'typescript';
import React, { useEffect, useState } from 'react';
import defaultContent from './defaultContent?raw';
import { createATA } from './ata';

export const typeHelper = createATA();

export function useProgress() {
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    typeHelper.addListener('progress', setProgress);

    const handleFinished = () => setFinished(true);
    typeHelper.addListener('finished', handleFinished);
    const handleStarted = () => setFinished(false);
    typeHelper.addListener('started', handleStarted);
    return () => {
      typeHelper.removeListener('progress', setProgress);
      typeHelper.removeListener('finished', handleFinished);
      typeHelper.removeListener('started', handleStarted);
    };
  }, []);

  return { progress, finished };
}

export const setupEditor: React.ComponentProps<typeof Editor>['onMount'] = (
  editor,
  monaco
) => {
  // acquireType on initial load
  editor.onDidChangeModelContent(() => {
    typeHelper.acquireType(editor.getValue());
  });

  const defaults = monaco.languages.typescript.typescriptDefaults;

  defaults.setCompilerOptions({
    jsx: JsxEmit.React,
    esModuleInterop: true,
  });

  const addLibraryToRuntime = (code: string, _path: string) => {
    const path = 'file://' + _path;
    defaults.addExtraLib(code, path);

    // don't need to open the file in the editor
    // const uri = monaco.Uri.file(path);
    // if (monaco.editor.getModel(uri) === null) {
    //   monaco.editor.createModel(code, 'javascript', uri);
    // }
  };

  typeHelper.addListener('receivedFile', addLibraryToRuntime);

  typeHelper.acquireType(defaultContent);
};
