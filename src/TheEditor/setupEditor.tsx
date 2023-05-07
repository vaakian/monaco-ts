import { Editor } from '@monaco-editor/react';
import { JsxEmit } from 'typescript';
import React from 'react';
import { setupTypeAcquisition } from '@typescript/ata';
import ts from 'typescript';
import defaultContent from './defaultContent?raw';

export const setupEditor: React.ComponentProps<typeof Editor>['onMount'] = (
  editor,
  monaco
) => {
  const defaults = monaco.languages.typescript.typescriptDefaults;
  defaults.setCompilerOptions({
    jsx: JsxEmit.Preserve,
    esModuleInterop: true,
  });

  const addLibraryToRuntime = (code: string, _path: string) => {
    const path = 'file://' + _path;
    defaults.addExtraLib(code, path);
    const uri = monaco.Uri.file(path);
    if (monaco.editor.getModel(uri) === null) {
      monaco.editor.createModel(code, 'javascript', uri);
    }
  };

  const ata = setupTypeAcquisition({
    projectName: 'monaco-ts',
    typescript: ts,
    logger: console,
    fetcher(input, init) {
      console.log('fetching =>', input, init);
      return fetch(input, init);
    },
    delegate: {
      receivedFile: (code, path) => {
        console.log({ code, path });
        addLibraryToRuntime(code, path);
      },
      progress: (downloaded, total) => {
        console.log({ downloaded, total });
      },
      started: () => {
        console.log('ATA start');
      },
      finished: (_f) => {
        console.log('ATA done', _f);
      },
    },
  });

  editor.onDidChangeModelContent(e => {
    ata(editor.getValue());
  });
  ata(defaultContent);
};
