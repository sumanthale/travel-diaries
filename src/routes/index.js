import RequireAuth from "Helpers/requreAuth";
import MainLayout from "layout/MainLayout";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import Dashboard from "views/dashboard/Default";

// routes
// import MainRoutes from "./MainRoutes";
// import AuthenticationRoutes from "./AuthenticationRoutes";
import Login from "views/pages/authentication/authentication/Login";
import Register from "views/pages/authentication/authentication/Register";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  // return useRoutes([MainRoutes, AuthenticationRoutes]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route exact path="/" element={<h1>Dashboard</h1>} />
        {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
      </Route>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
