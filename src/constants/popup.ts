import { ErrorInfo, Route, SettingsInfo } from "@/types";
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

export { ROUTES, LIST_SKELETON_COUNT, SETTINGS, ERRORS };
