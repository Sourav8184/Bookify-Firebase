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
import Details from "./pages/Details";
import ViewOrder from "./pages/ViewOrder";
import ViewOrderDetails from "./pages/ViewOrderDetails";

function App() {
  return (
    <div>
      <MyNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/list" element={<List />} />
        <Route path="/book/view/:bookId" element={<Details />} />
        <Route path="/book/orders" element={<ViewOrder />} />
        <Route path="/books/orders/:bookId" element={<ViewOrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
