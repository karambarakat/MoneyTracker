import { useEffect, useState } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  ArrowBack as IconArrowBack,
  Info as IconInfo,
  Grade as IconGrade,
  PieChart as IconPieChart,
  Category as IconCategory,
  ImportExport as IconImportExport,
  Settings as IconSettings,
} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import LinearProgress from "@material-ui/core/LinearProgress";

import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
  Typography,
  Toolbar,
  AppBar,
} from "@material-ui/core";

import Drawer from "@material-ui/core/Drawer";
import { useSelector } from "react-redux";
import UserHeader from "./UserHeader";

// header componant
const Header = () => {
  const httpRequests = useSelector((state) => state.httpRequests);
  const someLoading = Object.values(httpRequests).some(
    (e) => e.readyState === "request"
  );

  const location = useLocation();
  const { url } = useRouteMatch();
  const classes = useStyle();
  const [drawer, toggleDrawer] = useModal(false);

  return (
    <>
      <div style={{ height: "64px" }}></div>
      <Drawer open={drawer} onClose={toggleDrawer(false)}>
        <div className={classes.drawer}>
          <List>
            <ListItem button className={classes.pb}>
              <ListItemIcon>
                <IconButton onClick={toggleDrawer(false)}>
                  <IconArrowBack />
                </IconButton>
              </ListItemIcon>
            </ListItem>

            <Link to="/charts" className={classes.removeDecoration}>
              <ListItem button onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <IconPieChart />
                </ListItemIcon>
                <ListItemText>Charts</ListItemText>
              </ListItem>
            </Link>

            <Divider></Divider>
            <Link to="/categories" className={classes.removeDecoration}>
              <ListItem button onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <IconCategory />
                </ListItemIcon>
                <ListItemText>Categories</ListItemText>
              </ListItem>
            </Link>

            <Link
              style={{
                textDecoration: "initial",
                color: "initial",
              }}
              to={{
                pathname: `/export`,
                state: { background: location, path: "/export" },
              }}
            >
              <ListItem button onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <IconImportExport />
                </ListItemIcon>
                <ListItemText>Export</ListItemText>
              </ListItem>
            </Link>

            <Link
              style={{
                textDecoration: "initial",
                color: "initial",
              }}
              to={{
                pathname: `/setting`,
                state: { background: location, path: "/setting" },
              }}
            >
              <ListItem button onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <IconSettings />
                </ListItemIcon>
                <ListItemText>Setting</ListItemText>
              </ListItem>
            </Link>

            <Link
              style={{
                textDecoration: "initial",
                color: "initial",
              }}
              to={{
                pathname: `/rateUs`,
                state: { background: location, path: "/rateUs" },
              }}
            >
              <ListItem button onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <IconGrade />
                </ListItemIcon>
                <ListItemText>Rate Us</ListItemText>
              </ListItem>
            </Link>

            <Link
              style={{
                textDecoration: "initial",
                color: "initial",
              }}
              to={{
                pathname: `/about`,
                state: { background: location, path: "/about" },
              }}
            >
              <ListItem button onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <IconInfo />
                </ListItemIcon>
                <ListItemText>About</ListItemText>
              </ListItem>
            </Link>

            {/* <ListItem
              button
              component="a"
              onClick={toggleDrawer(true)}
              href="https://www.streamlineicons.com/"
              target="_blank"
            >
              <ListItemIcon>
                <IconInfo />
              </ListItemIcon>
              <ListItemText>
                Icons from Streamline Icons <OpenInNewIcon font={1} />
              </ListItemText>
            </ListItem> */}
          </List>
        </div>
      </Drawer>
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} color="inherit" variant="h6">
            <Link to="/" className={classes.removeDecoration}>
              Home
            </Link>
          </Typography>
          <UserHeader />
        </Toolbar>
        {someLoading && <LinearProgress />}
      </AppBar>
    </>
  );
};

const useStyle = makeStyles((theme) => {
  return {
    removeDecoration: {
      textDecoration: "none",
      color: "inherit",
      "&:active": {
        color: "inherit",
      },
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
      minWidth: "20rem",
    },
    pb: {
      paddingBottom: "10rem",
    },
    fixedGap: {
      height: "64px",
    },
  };
});

const useModal = (isOpen) => {
  const [drawer, setDrawer] = useState(isOpen);
  const toggleDrawer = (state) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(state);
  };
  return [drawer, toggleDrawer];
};

export default Header;
