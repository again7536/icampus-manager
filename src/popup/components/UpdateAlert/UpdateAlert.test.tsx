import { render } from "@/__test__/customRender";
import mockStorage from "@/__test__/mock/storage";
import { cleanup, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { chrome } from "jest-chrome";
import { ATOM_KEYS } from "@/constants";
import GlobalAlert from "./UpdateAlert";

describe("UpdateAlert UI Test", () => {
  const LATEST_VERSION = "1.0.1";
  const OLD_VERSION = "1.0.0";

  const initVersion = async (version: string) => {
    await chrome.storage.local.set({ [ATOM_KEYS.VERSION]: version });
  };

  const queryAlert = () => screen.queryByText(/업데이트/);
  const mockVersion = () => {
    const mockedFn = jest.spyOn(chrome.runtime, "getManifest");
    mockedFn.mockImplementation(() => ({
      version: LATEST_VERSION,
      manifest_version: 3,
      name: "",
    }));

    return mockedFn.mockRestore;
  };

  beforeEach(() => {
    mockVersion();
    mockStorage();
  });
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  test("Update alert should not be shown at first time", async () => {
    await render(<GlobalAlert />);

    await waitFor(() => expect(queryAlert()).toBeFalsy());
  });

  test("Update alert should not be shown on latest", async () => {
    await initVersion(LATEST_VERSION);
    await render(<GlobalAlert />);

    await waitFor(() => expect(queryAlert()).toBeFalsy());
  });

  test("Update alert should be shown when updated", async () => {
    await initVersion(OLD_VERSION);
    await render(<GlobalAlert />);

    await waitFor(() => expect(queryAlert()).toBeTruthy());
  });
});
