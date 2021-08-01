import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";
import * as actions from "../redux/Actions";
import http from "../redux/Actions/http";

//todos: the funtionality is working as expected except updating category it should update to the old values
//todos: not sure if i want to show 204 error; also 204 error is shown in as "204 | undefined" I need to fix this
//UX imrrovment: the content is not being updated after perfoming the action (i need to manualy update the page)
//UX improvment: after perfoming the actin new action appear (as expected) i need to cut this chain by displyaing 'done' notification

const Snack = () => {
  const notifications = useSelector((state) => state.notifications);
  const [lastNoti, setLastNoti] = useState({});

  useEffect(() => {
    //if there is new notification i want to set it to the lastNoti and open the snackbar
    if (
      notifications.length >= 1 &&
      lastNoti !== notifications[notifications.length - 1]
    ) {
      setLastNoti(notifications[notifications.length - 1]);
      setOpen(true);
    }
    return () => {
      setOpen(false);
    };
  }, [notifications]);

  //copied from Material-UI
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={lastNoti.message}
      action={
        lastNoti.action ? (
          <>
            <Button
              color="secondary"
              size="small"
              onClick={async () => {
                console.log(
                  actions[lastNoti.action.fn](...lastNoti.action.args)
                );
                await http(
                  actions[lastNoti.action.fn](...lastNoti.action.args)
                );
              }}
            >
              {lastNoti.action.text}
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        )
      }
    />
  );
};

export default Snack;
