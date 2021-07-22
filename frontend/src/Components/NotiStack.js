import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

function NotiStack() {
  const [open, massage, handleClose] = useLogic();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={massage}
      action={
        <React.Fragment>
          {/* <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button> */}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}

const useLogic = () => {
  const [open, setOpen] = useState(false);
  const [massage, setMassage] = useState("Welcome");
  const handleClose = () => {
    setOpen(false);
  };
  const notistack = useSelector((state) => state.notistack);
  useEffect(() => {
    if (notistack.update === 0) {
      return;
    }
    setOpen(true);
    setMassage(notistack.massege);
  }, [notistack.update]);

  return [open, massage, handleClose];
};

export default NotiStack;
