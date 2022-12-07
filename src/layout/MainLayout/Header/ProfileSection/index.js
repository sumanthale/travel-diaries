import { useState, useRef, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";

// third-party

// project imports
import MainCard from "ui-component/cards/MainCard";
import Transitions from "ui-component/extended/Transitions";

// assets
import { IconLogout, IconSettings } from "@tabler/icons";
import { AuthContext } from "context/AuthContext";
import { PasswordTwoTone, Person2Outlined } from "@mui/icons-material";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();

  const { signOutUser, user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = async () => {
    signOutUser();
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            "& svg": {
              stroke: theme.palette.primary.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        label={
          <IconSettings
            stroke={1.5}
            size="1.5rem"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ p: 2 }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography variant="h4">Hello,</Typography>
                      <Typography
                        component="span"
                        variant="h4"
                        sx={{ fontWeight: 400 }}
                      >
                        {user?.email}
                      </Typography>
                    </Stack>
                    <List
                      component="nav"
                      sx={{
                        width: "100%",
                        maxWidth: 350,
                        minWidth: 300,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "10px",
                        [theme.breakpoints.down("md")]: {
                          minWidth: "100%",
                        },
                      }}
                    >
                      <ListItemButton
                        sx={{
                          borderRadius: `${customization.borderRadius}px`,
                        }}
                        onClick={(event) => {
                          handleClose(event);

                          navigate("/account");
                        }}
                      >
                        <ListItemIcon>
                          <IconSettings stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">
                              Account Settings
                            </Typography>
                          }
                        />
                      </ListItemButton>
                      <ListItemButton
                        sx={{
                          borderRadius: `${customization.borderRadius}px`,
                        }}
                        onClick={(event) => {
                          handleClose(event);

                          navigate("/profile");
                        }}
                      >
                        <ListItemIcon>
                          <Person2Outlined size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">
                              Profile Settings
                            </Typography>
                          }
                        />
                      </ListItemButton>
                      <ListItemButton
                        sx={{
                          borderRadius: `${customization.borderRadius}px`,
                        }}
                        onClick={(event) => {
                          handleClose(event);

                          navigate("/forgot-password");
                        }}
                      >
                        <ListItemIcon>
                          <PasswordTwoTone size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">
                              Change Password
                            </Typography>
                          }
                        />
                      </ListItemButton>
                      <ListItemButton
                        sx={{
                          borderRadius: `${customization.borderRadius}px`,
                        }}
                        onClick={handleLogout}
                      >
                        <ListItemIcon>
                          <IconLogout stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">Logout</Typography>
                          }
                        />
                      </ListItemButton>
                    </List>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
