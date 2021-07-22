import React, { useState } from "react";
import { useSelector } from "react-redux";

import CategoryIcon from "./CategoryIcon";
// import { CatOfflineList } from "./utils";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = (hover) => {
  return makeStyles((theme) => {
    let returnValue = {
      container: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        border: `1.2px solid ${theme.palette.grey[400]}`,
        borderRadius: `${theme.shape.borderRadius}px`,
      },
      AddButton: {
        border: `2px dotted ${theme.palette.grey[500]}`,
      },
    };

    returnValue.container["&:hover"] = hover && {
      border: `1.2px solid ${theme.palette.grey[900]}`,
    };

    return returnValue;
  })();
};

const CategoryList = ({ list, children, onCatClick = () => {} }) => {
  const classes = useStyles();
  const categoryList = useSelector((state) => state.category);

  return (
    <Box p={3} my={3} className={classes.container}>
      <Grid container>
        {list.map((item) => (
          <Grid key={item._id} item xs={3} align="center">
            <Box py={1}>
              <CategoryIcon
                onClick={() => {
                  onCatClick(item);
                }}
                iconName={item.icon}
                color={item.color}
              />
              <Typography variant="body1">{item.title}</Typography>
            </Box>
          </Grid>
        ))}
        <Grid item xs={3} align="center">
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryList;
