import React, { useState } from "react";
import CategoryIcon from "./CategoryIcon";
import { allAvailableIconJSX } from "../utils";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: `1.2px solid ${theme.palette.grey[400]}`,
    borderRadius: `${theme.shape.borderRadius}px`,
    "&:hover": { border: `1.2px solid ${theme.palette.grey[900]}` },
  },
}));

const CategoryListInteractive = ({ value, onCatChange }) => {
  const classes = useStyles();
  const { color } = useSelector((state) => state.activeCategory);

  return (
    <Box p={3} my={3} className={classes.container}>
      <Grid container>
        {Object.keys(allAvailableIconJSX).map((item, id) => (
          <Grid key={id} item xs={3} align="center">
            <Box
              py={1}
              onClick={() => {
                onCatChange(item);
              }}
            >
              <CategoryIcon color={color} on={item === value} iconName={item} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryListInteractive;
