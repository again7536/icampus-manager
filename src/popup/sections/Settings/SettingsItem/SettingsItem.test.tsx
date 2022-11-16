import { SETTINGS } from "@/constants";
import { SettingsKey } from "@/types";
import { render } from "@/__test__/customRender";
import mockStorage from "@/__test__/mock/storage";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
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

  beforeEach(() => mockStorage());
  afterEach(() => cleanup());

  test("Switch type setting could be toggled", async () => {
    await render(<TestTarget settingsKey="DDAY" />);
  });

  test("Select type settings could be selected", async () => {
    await render(<TestTarget settingsKey="PLAYRATE" />);
  });
});
