import React from "react";
import { Typography, Paper, Box } from "@material-ui/core";

export const NotFound = () => {
  return (
    <Box>
      <Paper>
        <Box p={8} my={2} className="pageImgContainer">
          <div className="notFound"></div>
          <Typography variant="h4" align="center">
            No Entries Found
          </Typography>
          <Typography variant="subtitle2" align="center">
            press on add button below
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
export const E404 = () => {
  return (
    <Paper>
      <Box p={8} my={2} className="pageImgContainer">
        <div className="E404"></div>
        <Typography variant="h4" align="center">
          Server Error 404
        </Typography>
        <Typography variant="subtitle2" align="center">
          please try later
        </Typography>
      </Box>
    </Paper>
  );
};
export const Loading = () => {
  return (
    <Paper>
      <Box p={8} my={2} className="pageImgContainer">
        <div className="Loading"></div>
        <Typography variant="h4" align="center">
          Data is Loading ...
        </Typography>
        <Typography variant="subtitle2" align="center">
          wait a sec
        </Typography>
      </Box>
    </Paper>
  );
};
