import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Members from "../pages/Members";
import Events from "../pages/Events";
import Settings from "../pages/Settings";
import Login from "../pages/Login";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="members" element={<Members />} />
        <Route path="events" element={<Events />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;