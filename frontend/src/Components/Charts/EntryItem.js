import React from "react";
import { useDispatch } from "react-redux";
import CategoryIcon from "../Category/CategoryIcon";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";

const EntryItem = ({ data, firstTotal }) => {
  const dispatch = useDispatch();
  return (
    <ListItem
      onClick={() => {
        dispatch({ type: "gallery/open" });
      }}
      button
      component="a"
    >
      <ListItemIcon style={{ minWidth: 0 }}>
        <CategoryIcon
          iconName={data.Category.iconName}
          color={data.Category.color}
          on
        />
      </ListItemIcon>
      <Box flexGrow={1} pl={2}>
        <ListItemText>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
            }}
          >
            <Typography variant="h5" noWrap>
              {data.Title || data.Category.title || data.Notes}
            </Typography>
            <Typography
              style={{ marginLeft: "0.5rem", marginRight: "auto" }}
              variant="caption"
              noWrap
            >
              {data.Percentage}%
            </Typography>
            <Typography variant="caption" noWrap>
              {data.Total}
            </Typography>
          </div>
        </ListItemText>
        <LinearProgress
          variant="determinate"
          value={(data.Total / firstTotal) * 100}
        />
        {/* <LinearProgress variant="determinate" value={data.Total / firstTotal} /> */}
      </Box>
    </ListItem>
  );
};

export default EntryItem;
