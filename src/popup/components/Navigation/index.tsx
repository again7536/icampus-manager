import { Tabs, Tab } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { ROUTES } from "@/constants";
import { useLocation, useNavigate } from "react-router-dom";

/* TODO: reusable 하게 만들기 (constant 활용) */
function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClickTab = (path: string) => navigate(path);

  return (
    <Tabs value={location.pathname} sx={{ marginBottom: "10px" }}>
      <Tab
        value={ROUTES.INDEX.path}
        icon={<ListIcon />}
        onClick={() => handleClickTab(ROUTES.INDEX.path)}
      />
      <Tab
        value={ROUTES.PLAYLIST.path}
        icon={<SmartDisplayIcon />}
        onClick={() => handleClickTab(ROUTES.PLAYLIST.path)}
      />
    </Tabs>
  );
}

export default Navigation;
