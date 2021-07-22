import React, { useEffect, useState } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
// my files
import { HttpHandler } from "../Http/HttpHandler";
import { getLogs } from "../../redux/Actions/LogsAtions";
import SummaryPaper from "./SummaryPaper";
import LogList from "./LogList";
// materialize
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Add from "@material-ui/icons/Add";

const Home = () => {
  return (
    <>
      <HttpHandler selector={(s) => s.logs} action={() => getLogs()}>
        {(logs) => (
          <Container maxWidth="sm">
            <SummaryPaper logs={logs} />
            <Grid container>
              <Grid item xs={12}>
                <LogList logs={logs} />
              </Grid>
            </Grid>
          </Container>
        )}
      </HttpHandler>

      <Box position={"fixed"} bottom={20} right={20}>
        <Link to="new-log">
          <Fab color="primary" aria-label="add">
            <Add></Add>
          </Fab>
        </Link>
      </Box>
    </>
  );
};

export default Home;
