// import { Routes, Route } from "react-router";
import Home from "./main/index";
import AdminPanel from "./components/admin";
import "./css/style.css";
import "./App.css";
import { Route, Routes } from "react-router";

function AppRoute() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
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
