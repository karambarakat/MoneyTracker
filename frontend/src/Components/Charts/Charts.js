import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import PieChart from "./PieChart";
import ShortSummary from "./ShortSummary";
import Summary from "./Summary";
import { useSelector } from "react-redux";
import { ListNester, ListTruncation } from "../../Mixins/ListMinupCharts";

const Charts = () => {
  const logs = useSelector((state) => state.logs);
  if (logs.length == 0) {
    return <div></div>;
  }
  const [formated, grandTotal] = ListNester(logs);
  const formatedTruncated = ListTruncation(formated);
  console.log(formated, formatedTruncated);
  return (
    <Container disableGutters maxWidth="sm">
      <Box my={2}>
        <Grid container flex spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Box p={3}>
                    <PieChart categories={formatedTruncated} />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box p={3}>
                    <ShortSummary
                      categories={formatedTruncated}
                      grandTotal={grandTotal}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper>
              <Box p={3}>
                <Summary
                  categories={formated}
                  grandTotal={grandTotal}
                ></Summary>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Charts;
