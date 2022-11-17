import { ErrorInfo, Route, SettingsInfo, SettingsType } from "@/types";
import ListIcon from "@mui/icons-material/List";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import SettingsIcon from "@mui/icons-material/Settings";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";

const ROUTES: Route = {
  INDEX: {
    path: "/",
    Icon: ListIcon,
  },
  PLAYLIST: {
    path: "/playlist",
    Icon: SmartDisplayIcon,
  },
  MATERIALS: {
    path: "/materials",
    Icon: SimCardDownloadIcon,
  },
  SETTINGS: {
    path: "/settings",
    Icon: SettingsIcon,
  },
};

const SETTINGS_TYPE: { [key: string]: SettingsType } = {
  SELECT: "select",
  SWITCH: "switch",
  NUMBER: "number",
};

const SETTINGS: SettingsInfo = {
  DDAY: { title: "기한을 남은 시간으로 표기", defaultValue: false, type: SETTINGS_TYPE.SWITCH },
  WINDOW: {
    title: "확장을 새 탭 대신 창으로 열기",
    defaultValue: false,
    type: SETTINGS_TYPE.SWITCH,
  },
  PLAYRATE: {
    title: "재생 속도 변경",
    defaultValue: "8",
    type: SETTINGS_TYPE.SELECT,
    options: [
      { name: "x0.5", value: "1" },
      { name: "x0.8", value: "2" },
      { name: "x1.0", value: "3" },
      { name: "x1.2", value: "4" },
      { name: "x1.4", value: "5" },
      { name: "x1.6", value: "6" },
      { name: "x1.8", value: "7" },
      { name: "x2.0", value: "8" },
    ],
  },
};

const PLAYRATE = [999999, 0.5, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0];

const ERRORS: ErrorInfo = {
  AUTH: {
    name: "Auth",
    message: "아이캠퍼스 로그인이 필요합니다.",
  },
  UNEXPECTED: {
    name: "Unexpected",
    message: "예상하지 못한 에러가 발생했습니다.",
  },
};

const LIST_SKELETON_COUNT = 4;

export { ROUTES, LIST_SKELETON_COUNT, SETTINGS, SETTINGS_TYPE, ERRORS, PLAYRATE };
