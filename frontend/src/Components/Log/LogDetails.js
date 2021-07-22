import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const LogDetails = ({ log }) => {
  const classes = useStyle();

  return (
    <>
      <Box pt={2} pb={2} display="flex" alignItems="start">
        <Typography variant="h5" className={classes.minWidth}>
          Amount:
        </Typography>
        <Typography variant="h5">{log.amount}</Typography>
      </Box>
      <Box pt={2} pb={2} display="flex" alignItems="start">
        <Typography variant="h5" className={classes.minWidth}>
          Category:
        </Typography>
        <Typography variant="h5">
          {/* {JSON.stringify(log._Category)} */}
          {log._category.title}
        </Typography>
      </Box>
      <Box pt={2} pb={2} display="flex" alignItems="start">
        <Typography variant="h5" className={classes.minWidth}>
          Date Created:
        </Typography>
        <Typography variant="h5">{log.createdAt}</Typography>
      </Box>
      <Box pt={2} pb={2} display="flex" alignItems="start">
        <Typography variant="h5" className={classes.minWidth}>
          Notes:
        </Typography>
        <Typography variant="h5" className={classes.Warp}>
          {log.note}
        </Typography>
      </Box>
    </>
  );
};

const useStyle = makeStyles({
  minWidth: {
    minWidth: 170,
    color: "grey",
  },
  Warp: {
    wordWrap: "break-word",
  },
});

export default LogDetails;
