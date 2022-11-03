import { render } from "@/__test__/customRender";
import mockStorage from "@/__test__/mock/storage";
import "@testing-library/jest-dom";
import { cleanup, screen } from "@testing-library/react";
import Settings from ".";

describe("Settings section UI test", () => {
  beforeEach(() => mockStorage());
  afterEach(() => cleanup());

  const getVersion = () => screen.getByText("버전");
  const getGithub = () => screen.getByText("버그 제보 및 기능 제안");
  const getSettings = () => screen.getByText("설정");

  test("Version and developer infos should be displayed", async () => {
    await render(<Settings />);
    getVersion();
    getGithub();
  });

  test("Settings could be changed", async () => {
    await render(<Settings />);
    getSettings();
  });
});
