import { MemoryRouter, Routes, Route } from "react-router-dom";
import Main from "@/popup/sections/main";
import Check from "@/popup/sections/check";

function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/check" element={<Check />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;
