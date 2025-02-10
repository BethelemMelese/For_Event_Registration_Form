import Home from "./main/index";
import AdminPanel from "./components/admin";
import "./css/style.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import NoPermission from "./components/noPermission";

function AppRoute() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="noPermission" element={<NoPermission />} />
        <Route
          path="forEvent"
          // element={<RoutePrivacy component={MainLayout} />}
        >
          <Route path="adminPanel" element={<AdminPanel />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AppRoute;
