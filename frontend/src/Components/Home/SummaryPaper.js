import React from "react";
import Paper from "@material-ui/core/Paper";
import Typrography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { useDispatch } from "react-redux";
const SummaryPaper = ({ logs }) => {
  const total = logs.reduce((t, e) => (t += e.amount), 0) || 0;

  return (
    <Box py={2}>
      <Paper>
        <Box p={4}>
          <Grid container justify="center">
            {/* <Grid item>
              <Typrography variant="subtitle1" align="center">
                Expenses
              </Typrography>
              <Typrography variant="h4" align="center">
                0
              </Typrography>
            </Grid>
            <Grid item>
              <Typrography variant="subtitle1" align="center">
                Income
              </Typrography>
              <Typrography variant="h4" align="center">
                0
              </Typrography>
            </Grid> */}
            <Grid item>
              <Typrography variant="subtitle1" align="center">
                Balance
              </Typrography>
              <Typrography variant="h4" align="center">
                {total}
              </Typrography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default SummaryPaper;
