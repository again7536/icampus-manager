import { Routes, Route } from "react-router-dom";
import Main from "@/popup/sections/main";
import PlayList from "@/popup/sections/playlist";
import Navigation from "@/popup/components/Navigation";
import * as S from "./styled";

function App() {
  return (
    <S.PopupContainer>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/check" element={<PlayList />} />
      </Routes>
    </S.PopupContainer>
  );
}

export default App;
