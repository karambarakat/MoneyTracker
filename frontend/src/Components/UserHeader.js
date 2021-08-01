import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import React from "react";
import http from "../redux/Actions/http";
import { Link, useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import { logOut } from "../redux/Actions/userActions";
import { useDispatch } from "react-redux";

const UserHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const history = useHistory();
  const dispatch = useDispatch();
  return user ? (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Box color="primary.contrastText">Welcome {user.userName}</Box>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <Box color="text.primary">
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </Box>
        </Link>
        <MenuItem
          onClick={() => {
            dispatch(logOut());
            handleClose();
            history.push("/");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  ) : (
    <Link to="/signin" style={{ textDecoration: "none" }}>
      <Button>
        <Box color="primary.contrastText">Sign In</Box>
      </Button>
    </Link>
  );
};

export default UserHeader;
