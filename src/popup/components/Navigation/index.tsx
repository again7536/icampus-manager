import { Tabs, Tab } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Route } from "@/types";

interface NavigationProps {
  routes: Route;
}

function Navigation({ routes }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClickTab = (path: string) => navigate(path);

  return (
    <Tabs value={location.pathname} sx={{ marginBottom: "10px" }}>
      {Object.values(routes).map((val) => (
        <Tab
          value={val.path}
          key={val.path}
          icon={<val.Icon />}
          onClick={() => handleClickTab(val.path)}
        />
      ))}
    </Tabs>
  );
}

export default Navigation;
