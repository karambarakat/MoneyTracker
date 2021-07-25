import React from "react";
import { useRouteMatch, useLocation } from "react-router-dom";
// my components
import LogItem from "./LogItem";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import LinkToModal from "../LinkToModal";

const nester = (list, selector) => {
  //this is the return value
  //expected to be a list of sub-lists
  //; in which every sub-list elements have the same "selector" value
  let rVal = [];

  //this function will create a sub-list
  //"newCommonVal" is the common value between all sub-list's elements
  //"return" returns the length of the list
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

const LogList = ({ logs }) => {
  const classes = useStyle();

  let logsNested = nester(logs, (e) => new Date(e["createdAt"]).getDate());
  return (
    <>
      {/* todo: place the reverse in better position */}
      {/* todo: need better key prop */}
      {logsNested.reverse().map((logs, index) => (
        <Paper key={logs[0].createdAt} className={classes.p_paper}>
          <Typography variant="caption" className={classes.px_2}>
            {logs[0].createdAt}
          </Typography>
          <Divider></Divider>
          <List>
            {logs.map((e) => (
              <LinkToModal toModal={{ to: `log/${e._id}`, path: "log/:id" }}>
                <LogItem data={e} />
              </LinkToModal>
            ))}
          </List>
        </Paper>
      ))}
    </>
  );
};

const useStyle = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  p_paper: {
    marginBottom: theme.spacing(2),
  },
  pt_2: {
    paddingTop: theme.spacing(2),
  },
  px_2: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  p_2: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

export default LogList;
