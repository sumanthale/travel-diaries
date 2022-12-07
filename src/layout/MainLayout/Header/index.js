// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, Button, ButtonBase, Tooltip } from "@mui/material";

// project imports
import LogoSection from "../LogoSection";
import SearchSection from "./SearchSection";
import ProfileSection from "./ProfileSection";

// assets
import { IconMenu2 } from "@tabler/icons";
import { useLocation, useNavigate } from "react-router";
import { Home, Info, PostAdd, SearchRounded } from "@mui/icons-material";
import { BrowserView, MobileView } from "react-device-detect";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Box
        sx={{
          width: 300,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        {location.pathname === "/" ? (
          <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                transition: "all .2s ease-in-out",
                background: theme.palette.secondary.light,
                color: theme.palette.secondary.dark,
                "&:hover": {
                  background: theme.palette.secondary.dark,
                  color: theme.palette.secondary.light,
                },
              }}
              onClick={handleLeftDrawerToggle}
              color="inherit"
            >
              <IconMenu2 stroke={1.5} size="1.3rem" />
            </Avatar>
          </ButtonBase>
        ) : null}
      </Box>
      {location.pathname === "/" ? (
        <>
          <SearchSection />
        </>
      ) : null}
      <Box sx={{ flexGrow: 1 }} />
      <Tooltip title="Home">
        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.primary.light,
              color: theme.palette.primary.dark,
              "&:hover": {
                background: theme.palette.primary.light,
                color: theme.palette.primary.dark,
              },
            }}
            onClick={() => {
              navigate("/");
            }}
            color="inherit"
          >
            <Home stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Tooltip>
      <Tooltip title="Create Post">
        <ButtonBase
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            ml: { xs: 1, sm: 3 },
          }}
        >
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.primary.light,
              color: theme.palette.primary.dark,
              "&:hover": {
                background: theme.palette.primary.light,
                color: theme.palette.primary.dark,
              },
            }}
            onClick={() => {
              navigate("/post");
            }}
            color="inherit"
          >
            <PostAdd stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Tooltip>
      <Tooltip title="Travel Advisor">
        <ButtonBase
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            ml: { xs: 1, sm: 3 },
          }}
        >
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.primary.light,
              color: theme.palette.primary.dark,
              "&:hover": {
                background: theme.palette.primary.light,
                color: theme.palette.primary.dark,
              },
            }}
            onClick={() => {
              navigate("/travel");
            }}
            color="inherit"
          >
            <SearchRounded stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Tooltip>{" "}
      <Tooltip title="About Us">
        <ButtonBase
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            ml: { xs: 1, sm: 3 },
          }}
        >
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.primary.light,
              color: theme.palette.primary.dark,
              "&:hover": {
                background: theme.palette.primary.light,
                color: theme.palette.primary.dark,
              },
            }}
            onClick={() => {
              navigate("/about");
            }}
            color="inherit"
          >
            <Info stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Tooltip>
      <Box sx={{ flexGrow: 0.1 }} />
      <ProfileSection />
    </>
  );
};

export default Header;
