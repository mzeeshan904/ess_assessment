import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Person2Icon from "@mui/icons-material/Person2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import AdminImageSection from "../AdminImageSection/AdminImageSection";
// import InfoCard from "../InfoCard/InfoCard";
import Navbar from "../Navbar/Navbar";
import DualChartDashboard from "../Charts/DualChartDashboard";

const drawerWidth = 240;

function DashBoard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <AdminImageSection />
      <Divider />
      <List>
        {/* <Typography>Data</Typography> */}
        {[{ text: "Dashboard", icon: <HomeIcon /> }].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {/* <Typography>Data</Typography> */}
        {[
          { text: "Manage Team", icon: <PeopleAltIcon /> },
          { text: "Contacts", icon: <ContactPhoneIcon /> },
          { text: "Invoices Balance", icon: <FileCopyIcon /> },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {/* <Typography>Pages</Typography> */}
        {[
          { text: "Profile Form", icon: <Person2Icon /> },
          { text: "Calender", icon: <CalendarMonthIcon /> },
          { text: "FAQ Page", icon: <LiveHelpIcon /> },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{}}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        sx={{
          width: { sm: "100%", lg: `calc(100% - ${drawerWidth}px)` },
          marginTop: "100px",
        }}
      >
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap:'wrap',
            justifyContent: "space-between",
            padding: "0px 1.75rem",
            margin: "2rem 0px",
            width:'100%',
            
            "@media screen and (max-width: 768px)": {
              flexDirection: "column",
              alignItems: "center",
              padding: "0px 0.5rem",
              
            }
          }}
        >
          <InfoCard />
        </Box> */}
        <Box sx={{ width: { sm: "100%" } }}>
          <DualChartDashboard />
        </Box>
      </Box>
    </Box>
  );
}

export default DashBoard;





