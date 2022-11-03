import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Route {
  [key: string]: {
    path: string;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  };
}

type SettingsKey = "DDAY";
type SettingsInput = "switch" | "number";

type Settings = {
  [key in SettingsKey]: boolean | string;
};

type SettingsInfo = {
  [key in SettingsKey]: {
    title: string;
    defaultValue: boolean | string;
    type: SettingsInput;
  };
};

export type { Route, SettingsKey, SettingsInput, Settings, SettingsInfo };
