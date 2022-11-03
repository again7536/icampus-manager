import { Routes, Route } from "react-router-dom";
import Main from "@/popup/sections/Main";
import Lectures from "@/popup/sections/Lectures/Lectures";
import Navigation from "@/popup/components/Navigation/Navigation";
import Settings from "@/popup/sections/Settings/Settings";
import { ROUTES } from "@/constants";
import UpdateAlert from "./components/UpdateAlert/UpdateAlert";
import GlobalSnackbar from "./components/Snackbar/Snackbar";
import * as S from "./styled";

function App() {
  return (
    <S.PopupContainer>
      <Navigation routes={ROUTES} />
      <UpdateAlert />
      <Routes>
        <Route path={ROUTES.INDEX.path} element={<Main />} />
        <Route path={ROUTES.PLAYLIST.path} element={<Lectures />} />
        <Route path={ROUTES.SETTINGS.path} element={<Settings />} />
      </Routes>
      <GlobalSnackbar />
    </S.PopupContainer>
  );
}

export default App;
