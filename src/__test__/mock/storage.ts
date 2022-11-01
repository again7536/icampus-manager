import { chrome } from "jest-chrome";

const mockStorage = () => {
  const mockedStorage = new Map<string, string>();

  chrome.storage.local.get.mockImplementation((keys, callback) => {
    let result = {};
    if (keys === null)
      result = [...mockedStorage.entries()].reduce(
        (acc, [key, val]) => ({ ...acc, [key]: val }),
        {}
      );
    else if (typeof keys === "string") result = { [keys]: mockedStorage.get(keys) };
    else if (keys.length)
      result = (keys as string[]).reduce((acc, key) => {
        if (mockedStorage.has(key)) return { ...acc, [key]: mockedStorage.get(key) ?? "" };
        return acc;
      }, {} as { [k: string]: any });
    else
      result = Object.entries(keys as { [k: string]: any }).reduce((acc, [key, val]) => {
        return { ...acc, [key]: mockedStorage.get(key) ?? val };
      }, {} as { [k: string]: any });

    if (callback) callback(result);
    return Promise.resolve(result);
  });

  chrome.storage.local.set.mockImplementation(async (keys, callback) => {
    Object.entries(keys).forEach(([key, val]) => mockedStorage.set(key, val));
    if (callback) callback();
    return Promise.resolve();
  });
};

export default mockStorage;
