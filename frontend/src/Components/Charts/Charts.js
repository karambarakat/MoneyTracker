import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import PieChart from "./PieChart";
import ShortSummary from "./ShortSummary";
import Summary from "./Summary";
// import { useSelector } from "react-redux";
// import { ListNester, ListTruncation } from "../../Mixins/ListMinupCharts";
import { HttpHandler } from "../Http/HttpHandler";
import { getLogs } from "../../redux/Actions";

const nester = (list, selector) => {
  //this is the same function in the Home/LogList.js
  let rVal = [];
  const incF = (newCommonVal) => {
    commonVal = selector(newCommonVal);
    let inc = rVal.length;
    rVal[inc] = [];
    return inc;
  };
  let commonVal;
  let inc = incF(list[0]);
  list.forEach((e) => {
    let currVal = selector(e);
    if (currVal === commonVal) {
      rVal[inc].push(e);
    } else {
      inc = incF(e);
      rVal[inc].push(e);
    }
  });

  //todo: place the reverse in better position
  return rVal.map((e) => e.reverse());
};

const Charts = () => {
  // const nestedLogs = nester(logs, (e)=>e.category._id);
  // const formatedTruncated = ListTruncation(formated);
  // console.log(formated, formatedTruncated);

  return (
    <Container disableGutters maxWidth="sm">
      <Box my={2}>
        <HttpHandler selector={(s) => s.logs} action={getLogs()}>
          {(logs) => <ChartsInner logs={logs} />}
        </HttpHandler>
      </Box>
    </Container>
  );
};

export const ChartsInner = ({ logs }) => {
  const grandTotal = logs.reduce((acc, e) => acc + e.amount, 0);

  const nestedLogs = nester(
    logs.sort((a, b) => (a.category._id > b.category._id ? -1 : 1)),
    (e) => e.category._id
    //return a list of objects fo this schema
    /**
     * {
     *    logs: [logSchema],
     *    total: Number,            //the total of logs.$.amount
     *    categroy: categorySchema
     *    percentageRTTotal: float between 0 and 1
     *    percentageRTFirst: float between 0 and 1
     * }
     */
  )
    .map((e) => ({
      logs: e,
      category: e[0].category,
      total: e.reduce((acc, e) => acc + e.amount, 0),
    }))
    //sort by total

    .sort((a, b) => b.total - a.total)
    .map((e, i, arr) => ({
      ...e,
      percentageRTTotal: e.total / grandTotal,
      percentageRTFirst: e.total / arr[0].total,
    }));

  // limit to only an array of 5 elements;
  const trimedNestedLogs = nestedLogs.reduce((acc, e, i) => {
    if (i <= 4) acc.push(e);
    else {
      acc[4] = acc[4] || {}; //make it if undefined (5th itteration)
      acc[4] = {
        logs: [...acc[4].logs, ...e.logs],
        total: acc[4].total + e.total,
        percentageRTTotal: acc[4].percentageRTTotal + e.percentageRTTotal,
        percentageRTFirst: acc[4].percentageRTFirst + e.percentageRTFirst,
        //sodu category for the for the etc logs
        category: {
          _id: "xxx",
          title: "etc...",
          color: "b0b0b0",
          icon: "Extension",
        },
      };
    }
    return acc;
  }, []);

  return (
    <Grid container flex spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Box p={3}>
                <PieChart
                  nestedLogs={trimedNestedLogs}
                  grandTotal={grandTotal}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box p={3}>
                <ShortSummary
                  nestedLogs={trimedNestedLogs}
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
            <Summary nestedLogs={nestedLogs} grandTotal={grandTotal}></Summary>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Charts;
