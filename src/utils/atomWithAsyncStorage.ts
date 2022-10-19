import { atom } from "jotai";

interface AtomWithAsyncStorageParams<T> {
  key: string;
  initialValue: T;
}

const atomWithAsyncStorage = <T>({ key, initialValue }: AtomWithAsyncStorageParams<T>) => {
  const baseAtom = atom(initialValue);
  baseAtom.onMount = (setValue) => {
    (async () => {
      const item = await chrome.storage.sync.get(key);
      setValue(item[key]);
    })();
  };
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue = typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      chrome.storage.sync.set({ [key]: [nextValue] });
    }
  );
  return derivedAtom;
};

export default atomWithAsyncStorage;
