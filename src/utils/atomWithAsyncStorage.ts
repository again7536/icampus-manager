import { atom } from "jotai";

interface AtomWithAsyncStorageParams<T> {
  key: string;
  initialValue: T;
}

const atomWithAsyncStorage = <T>({ key, initialValue }: AtomWithAsyncStorageParams<T>) => {
  const baseAtom = atom(initialValue);
  baseAtom.onMount = (setValue) => {
    (async () => {
      const item = await chrome.storage.local.get(key);

      if (item[key] === undefined) {
        await chrome.storage.local.set({ [key]: initialValue });
        return;
      }
      setValue(item[key]);
    })();
  };
  const derivedAtom = atom<T, T | ((prevState: T) => T), void>(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === "function" ? (update as (prevState: T) => T)(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      chrome.storage.local.set({ [key]: nextValue });
    }
  );
  return derivedAtom;
};

export default atomWithAsyncStorage;
