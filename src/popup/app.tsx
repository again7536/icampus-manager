import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ROUTES } from "@/constants";
import LoadingIndicator from "@/popup/components/LoadingIndicator/LoadingIndicator";
import ErrorBoundary from "@/popup/components/ErrorBoundary/ErrorBoundary";
import UpdateAlert from "@/popup/components/UpdateAlert/UpdateAlert";
import LectureMaterials from "@/popup/sections/LectureMaterials/LectureMaterials";
import * as S from "./styled";

const Main = lazy(() => import("@/popup/sections/Main/Main"));
const Lectures = lazy(() => import("@/popup/sections/Lectures/Lectures"));
const Navigation = lazy(() => import("@/popup/components/Navigation/Navigation"));
const Settings = lazy(() => import("@/popup/sections/Settings/Settings"));
const GlobalSnackbar = lazy(() => import("@/popup/components/Snackbar/Snackbar"));
const GlobalModal = lazy(() => import("@/popup/components/Modal/GlobalModal"));

function App() {
  return (
    <S.PopupContainer>
      <Navigation routes={ROUTES} />
      <UpdateAlert />
      <ErrorBoundary>
        <Suspense fallback={<LoadingIndicator />}>
          <Routes>
            <Route path={ROUTES.INDEX.path} element={<Main />} />
            <Route path={ROUTES.PLAYLIST.path} element={<Lectures />} />
            <Route path={ROUTES.MATERIALS.path} element={<LectureMaterials />} />
            <Route path={ROUTES.SETTINGS.path} element={<Settings />} />
          </Routes>
          <GlobalSnackbar />
          <GlobalModal />
        </Suspense>
      </ErrorBoundary>
    </S.PopupContainer>
  );
}

export default App;
