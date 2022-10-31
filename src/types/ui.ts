import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Route {
  [key: string]: {
    path: string;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  };
}

export type { Route };
