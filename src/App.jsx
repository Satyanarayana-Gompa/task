import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Watch from "./Watch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
