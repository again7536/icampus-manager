import { SETTINGS } from "@/constants";
import { SettingsKey } from "@/types";
import { render } from "@/__test__/customRender";
import mockStorage from "@/__test__/mock/storage";
import "@testing-library/jest-dom";
import { cleanup, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import SettingsItem from "./SettingsItem";

interface TestTargetProps {
  settingsKey: SettingsKey;
}

describe("Settings section UI test", () => {
  function TestTarget({ settingsKey }: TestTargetProps) {
    const [temporalSetting, setTemporalSetting] = useState<string | boolean>("");
    const handleChange = (listKey: string, value: string | boolean) => setTemporalSetting(value);

    return (
      <SettingsItem
        temporalSetting={temporalSetting}
        onChange={handleChange}
        listKey={settingsKey}
        setting={SETTINGS[settingsKey]}
      />
    );
  }

  const getToggleSlider = () => screen.getByRole("slider");
  const checkToggled = ($container: HTMLElement) => {
    const $hiddenCheckbox = $container.querySelector<HTMLInputElement>("input[type='checkbox']");
    expect($hiddenCheckbox?.checked);
  };
  const getSelect = () => screen.getByRole("button");
  const getSelectList = () => screen.getByRole("listbox");

  beforeEach(() => mockStorage());
  afterEach(() => cleanup());

  test("Switch type setting could be toggled", async () => {
    await render(<TestTarget settingsKey="DDAY" />);

    fireEvent.click(getToggleSlider());
    checkToggled(getToggleSlider());
  });

  test("Select type settings could be selected", async () => {
    await render(<TestTarget settingsKey="PLAYRATE" />);

    fireEvent.mouseDown(getSelect());
    fireEvent.mouseDown(getSelectList().firstChild as ChildNode);
    expect(screen.getByText(SETTINGS.PLAYRATE.options?.[0].name ?? "FAILURE"));
  });
});
