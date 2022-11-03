import { Route, SettingsInfo } from "@/types";
import ListIcon from "@mui/icons-material/List";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import SettingsIcon from "@mui/icons-material/Settings";

const ROUTES: Route = {
  INDEX: {
    path: "/",
    Icon: ListIcon,
  },
  PLAYLIST: {
    path: "/playlist",
    Icon: SmartDisplayIcon,
  },
  SETTINGS: {
    path: "/settings",
    Icon: SettingsIcon,
  },
};

const SETTINGS: SettingsInfo = {
  DDAY: { title: "기한을 남은 시간으로 표기", defaultValue: false, type: "switch" },
};

const LIST_SKELETON_COUNT = 4;

export { ROUTES, LIST_SKELETON_COUNT, SETTINGS };
