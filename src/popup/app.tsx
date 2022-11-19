import { Routes, Route } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import Main from "@/popup/sections/Main/Main";
import Lectures from "@/popup/sections/Lectures/Lectures";
import Navigation from "@/popup/components/Navigation/Navigation";
import Settings from "@/popup/sections/Settings/Settings";
import { ROUTES } from "@/constants";
import ErrorBoundary from "@/popup/components/ErrorBoundary/ErrorBoundary";
import UpdateAlert from "@/popup/components/UpdateAlert/UpdateAlert";
import GlobalSnackbar from "@/popup/components/Snackbar/Snackbar";
import LectureMaterials from "@/popup/sections/LectureMaterials/LectureMaterials";
import * as S from "./styled";

function App() {
  return (
    <S.PopupContainer>
      <Navigation routes={ROUTES} />
      <UpdateAlert />
      <ErrorBoundary>
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path={ROUTES.INDEX.path} element={<Main />} />
            <Route path={ROUTES.PLAYLIST.path} element={<Lectures />} />
            <Route path={ROUTES.MATERIALS.path} element={<LectureMaterials />} />
            <Route path={ROUTES.SETTINGS.path} element={<Settings />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <GlobalSnackbar />
    </S.PopupContainer>
  );
}

export default App;
