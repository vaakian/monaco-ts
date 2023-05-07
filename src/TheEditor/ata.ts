import { setupTypeAcquisition, ATABootstrapConfig } from '@typescript/ata';
import ts from 'typescript';

const delegateListener = createDelegate();

const ata = setupTypeAcquisition({
  projectName: 'monaco-ts',
  typescript: ts,
  logger: console,
  fetcher(input, init) {
    // console.log('fetching =>', input, init);
    return fetch(input, init);
  },
  delegate: {
    receivedFile: (code, path) => {
      delegateListener.receivedFile.forEach((fn) => fn(code, path));
    },
    progress: (downloaded, total) => {
      delegateListener.progress.forEach((fn) => fn(downloaded, total));
    },
    started: () => {
      delegateListener.started.forEach((fn) => fn());
    },
    finished: (_f) => {
      delegateListener.finished.forEach((fn) => fn(_f));
    },
  },
});

type DelegateListener = Required<{
  [k in keyof ATABootstrapConfig['delegate']]: Set<
    NonNullable<ATABootstrapConfig['delegate'][k]>
  >;
}>;

function createDelegate() {
  const delegate: DelegateListener = {
    receivedFile: new Set(),
    progress: new Set(),
    errorMessage: new Set(),
    finished: new Set(),
    started: new Set(),
  };

  return delegate;
}

type InferSet<T> = T extends Set<infer U> ? U : never;

export function createATA() {
  const acquireType = (code: string) => ata(code);
  const addListener = <T extends keyof DelegateListener>(
    event: T,
    handler: InferSet<DelegateListener[T]>
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delegateListener[event].add(handler);
  };

  const removeListener = <T extends keyof DelegateListener>(
    event: T,
    handler: InferSet<DelegateListener[T]>
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delegateListener[event].delete(handler);
  };
  return {
    acquireType,
    addListener,
    removeListener,
    dispose: () => {
      for (const key in delegateListener) {
        delegateListener[key as keyof DelegateListener].clear();
      }
    },
  };
}
