import React from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SyncIcon from "@material-ui/icons/Sync";

const Setting = () => {
  return (
    <Container maxWidth="xs">
      <Paper style={{ padding: "1rem 0" }}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccessAlarmsIcon />
            </ListItemIcon>
            <ListItemText secondary="not available yet">
              Set daily reminder
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SyncIcon />
            </ListItemIcon>
            <ListItemText secondary="not available yet">
              Synce with google
            </ListItemText>
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default Setting;
