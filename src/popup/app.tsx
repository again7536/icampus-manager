import { Routes, Route } from "react-router-dom";
import Main from "@/popup/sections/Main/Main";
import Lectures from "@/popup/sections/Lectures/Lectures";
import Navigation from "@/popup/components/Navigation/Navigation";
import Settings from "@/popup/sections/Settings/Settings";
import { ROUTES } from "@/constants";
import ErrorBoundary from "@/popup/components/ErrorBoundary/ErrorBoundary";
import UpdateAlert from "@/popup/components/UpdateAlert/UpdateAlert";
import GlobalSnackbar from "@/popup/components/Snackbar/Snackbar";
import LectureMaterials from "./sections/LectureMaterials/LectureMaterials";
import * as S from "./styled";

function App() {
  return (
    <S.PopupContainer>
      <Navigation routes={ROUTES} />
      <UpdateAlert />
      <ErrorBoundary>
        <Routes>
          <Route path={ROUTES.INDEX.path} element={<Main />} />
          <Route path={ROUTES.PLAYLIST.path} element={<Lectures />} />
          <Route path={ROUTES.MATERIALS.path} element={<LectureMaterials />} />
          <Route path={ROUTES.SETTINGS.path} element={<Settings />} />
        </Routes>
      </ErrorBoundary>
      <GlobalSnackbar />
    </S.PopupContainer>
  );
}

export default App;
