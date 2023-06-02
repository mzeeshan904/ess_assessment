import React from "react";
import { Toolbar, Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Person2Icon from "@mui/icons-material/Person2";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AppBar from "@mui/material/AppBar";

const drawerWidth = 240;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "0px 2%",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm:'inline-block', md: "inline-block" } }}
            >
              Admin Dashboard
            </Typography>

            <Box
              sx={{
                display: { xs: "none",sm:'flex', md: "flex", lg: "flex" },
                // display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width:'12%',
                cursor: "pointer",
              }}
            >
              <Person2Icon />
              <SettingsIcon />
              <NotificationsActiveIcon />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
