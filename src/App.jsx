import { Routes, Route } from "react-router-dom";

//components
import MyNavBar from "./components/MyNavBar";

//CSS:
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import List from "./pages/List";

function App() {
  return (
    <div>
      <MyNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/list" element={<List />} />
      </Routes>
    </div>
  );
}

export default App;
