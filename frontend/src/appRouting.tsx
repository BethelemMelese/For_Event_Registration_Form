import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import NoPermission from "./components/noPermission";
import { AutoRout } from "./polices/AutoRoute";
import Layout from "./menu/layout";
import Home from "./main/index";
import AdminPanel from "./components/admin";
import ChangePassword from "./components/changePassword";
import "./css/style.css";
import "./css/media.query.css";
import "./App.css";

function AppRoute() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="noPermission" element={<NoPermission />} />
        <Route path="forEvent" element={<AutoRout component={Layout} />}>
          <Route path="adminPanel" element={<AdminPanel />} />
          <Route path="changePassword" element={<ChangePassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AppRoute;
