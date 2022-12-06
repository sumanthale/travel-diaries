import RequireAuth from "Helpers/requreAuth";
import MainLayout from "layout/MainLayout";
import MinimalLayout from "layout/MinimalLayout";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Contact from "views/contact";
import Account from "views/account";
import Home from "views/home";
import ForgotPassword from "views/pages/authentication/authentication/ForgotPassword";

// routes
// import MainRoutes from "./MainRoutes";
// import AuthenticationRoutes from "./AuthenticationRoutes";
import Login from "views/pages/authentication/authentication/Login";
import Register from "views/pages/authentication/authentication/Register";
import CreatePost from "views/posts/createPost";
import ViewPost from "views/posts/viewPost";
import Proflie from "views/profile";
import TravelAdvisor from "views/travel/TravelAdvisor";
import { Alert, Button } from "@mui/material";
import { Box } from "@mui/system";
import Success from "../assets/images/success.png";
import fail from "../assets/images/fail.png";
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const navigate = useNavigate();
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
        <Route exact path="/about" element={<Contact />} />
        <Route exact path="/travel" element={<TravelAdvisor />} />
        <Route exact path="/post" element={<CreatePost />} />
        <Route exact path="/edit/:postId" element={<CreatePost />} />
        <Route exact path="/view/:postId" element={<ViewPost />} />
        <Route exact path="/profile" element={<Proflie />} />
        <Route exact path="/account" element={<Account />} />
        <Route
          exact
          path="/success"
          element={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Alert severity="error" sx={{ my: 2 }}>
                {" "}
                Your Payment has been Successful Completed
              </Alert>
              <img src={Success} width="40%" alt="Success" />
            </Box>
          }
        />
        <Route
          exact
          path="/failed"
          element={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Alert
                severity="error"
                sx={{
                  my: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                action={
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => {
                      navigate("/about");
                    }}
                  >
                    Retry
                  </Button>
                }
              >
                Your Payment Failed Please Try Again.
              </Alert>
              <img src={fail} width="40%" alt="Success" />
            </Box>
          }
        />
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
