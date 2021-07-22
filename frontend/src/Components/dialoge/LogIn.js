import React from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
const LogIn = () => {
  return (
    <Container maxWidth="xs">
      <Paper style={{ padding: "1rem 0" }}>
        <Typography style={{ padding: "0 1rem" }} variant="h4">
          Log In
        </Typography>
        <Divider style={{ margin: "1rem 0" }} />
        <Typography style={{ padding: "1rem" }}>
          This feature is not available for now
        </Typography>
      </Paper>
    </Container>
  );
};

export default LogIn;
