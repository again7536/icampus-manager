import { SETTINGS } from "@/constants";
import { render } from "@/__test__/customRender";
import mockStorage from "@/__test__/mock/storage";
import "@testing-library/jest-dom";
import { cleanup, screen } from "@testing-library/react";
import Settings from "./Settings";

describe("Settings section UI test", () => {
  beforeEach(() => mockStorage());
  afterEach(() => cleanup());

  const getVersion = () => screen.getByText("버전");
  const getGithub = () => screen.getByText("버그 제보 및 기능 제안");
  const getSettings = () => Object.values(SETTINGS).map((val) => screen.getByText(val.title));

  test("Version and developer infos should be displayed", async () => {
    await render(<Settings />);
    getVersion();
    getGithub();
  });

  test("Settings are correctly displayed", async () => {
    await render(<Settings />);
    getSettings();
  });
});
