import React from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const About = () => {
  return (
    <Container maxWidth="xs">
      <Paper style={{ padding: "1rem 0" }}>
        <Typography style={{ padding: "0 1rem" }} variant="h4">
          About me
        </Typography>
        <Divider />
        <Typography style={{ padding: "1rem" }}>
          This project is part of my portofolio, to check the entire collection
          of porject pls check my website
        </Typography>
        <List>
          <ListItem button>
            <ListItemText secondary="not available yet">Website</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText secondary="not available yet">twitter</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText secondary="not available yet">UpWork</ListItemText>
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default About;
