import React from "react";
import { useDispatch } from "react-redux";
import CategoryIcon from "../Category/CategoryIcon";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";

const LogItem = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <ListItem
      style={{ maxWidth: 552 }}
      onClick={() => {
        dispatch({ type: "gallery/open" });
      }}
      button
      component="a"
    >
      <ListItemIcon style={{ minWidth: 0 }}>
        <CategoryIcon
          iconName={data.category.icon}
          color={data.category.color}
          on
        />
      </ListItemIcon>
      <Box flexGrow={1} pl={2}>
        <ListItemText>
          <Typography
            variant="subtitle1"
            style={{
              //todo: make sure to fix the max witdth if the style has changed
              maxWidth: 485,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            noWrap
          >
            {data.title}
          </Typography>
        </ListItemText>
      </Box>
      <Box flexGrow={0}>
        <ListItemText>
          <Box display="flex" alignContent="center">
            {/* <IconButton size="small" aria-label="delete">
              <Edit />
            </IconButton> */}
            <Typography variant="subtitle2" noWrap>
              {data.amount}
            </Typography>
          </Box>
        </ListItemText>
      </Box>
    </ListItem>
  );
};

export default LogItem;
