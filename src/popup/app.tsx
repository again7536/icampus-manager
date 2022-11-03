import { Routes, Route } from "react-router-dom";
import Main from "@/popup/sections/main";
import PlayList from "@/popup/sections/playlist";
import Navigation from "@/popup/components/Navigation";
import Settings from "@/popup/sections/settings";
import { ROUTES } from "@/constants";
import UpdateAlert from "./components/UpdateAlert";
import GlobalSnackbar from "./components/Snackbar";
import * as S from "./styled";

function App() {
  return (
    <S.PopupContainer>
      <Navigation routes={ROUTES} />
      <UpdateAlert />
      <Routes>
        <Route path={ROUTES.INDEX.path} element={<Main />} />
        <Route path={ROUTES.PLAYLIST.path} element={<PlayList />} />
        <Route path={ROUTES.SETTINGS.path} element={<Settings />} />
      </Routes>
      <GlobalSnackbar />
    </S.PopupContainer>
  );
}

export default App;
