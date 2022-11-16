import RequireAuth from "Helpers/requreAuth";
import MainLayout from "layout/MainLayout";
import MinimalLayout from "layout/MinimalLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import Account from "views/account";
import Home from "views/home";
import ForgotPassword from "views/pages/authentication/authentication/ForgotPassword";

// routes
// import MainRoutes from "./MainRoutes";
// import AuthenticationRoutes from "./AuthenticationRoutes";
import Login from "views/pages/authentication/authentication/Login";
import Register from "views/pages/authentication/authentication/Register";
import Proflie from "views/profile";

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
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile" element={<Proflie />} />
        <Route exact path="/account" element={<Account />} />
      </Route>
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<MinimalLayout />}>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
