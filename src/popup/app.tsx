import { Routes, Route } from "react-router-dom";
import Main from "@/popup/sections/main";
import PlayList from "@/popup/sections/playlist";
import Navigation from "@/popup/components/Navigation";
import * as S from "./styled";
import { ROUTES } from "./constants";

function App() {
  return (
    <S.PopupContainer>
      <Navigation />
      <Routes>
        <Route path={ROUTES.INDEX.path} element={<Main />} />
        <Route path={ROUTES.PLAYLIST.path} element={<PlayList />} />
      </Routes>
    </S.PopupContainer>
  );
}

export default App;
