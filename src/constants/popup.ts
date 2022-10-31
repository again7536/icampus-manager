import { Route } from "@/types";
import ListIcon from "@mui/icons-material/List";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";

const ROUTES: Route = {
  INDEX: {
    path: "/",
    Icon: ListIcon,
  },
  PLAYLIST: {
    path: "/playlist",
    Icon: SmartDisplayIcon,
  },
};

const LIST_SKELETON_COUNT = 4;

export { ROUTES, LIST_SKELETON_COUNT };
