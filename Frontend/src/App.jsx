import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/Homepage.jsx";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen m-0">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
