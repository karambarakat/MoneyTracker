import React, { useEffect, useRef, useState } from "react";
import Add from "@material-ui/icons/Add";
import LinkTo from "../LinkTo";
import CategoryIcon from "./CategoryIcon";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
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

/**
 * @desc this file put more emphasis on the styling of category's boxs
 *    as oppose of the display content
 * @desc CatBox: is the base element and provide basic styling
 *    for the rest of the components here
 */
const CatBox = ({
  children = [],
  append,
  hover,
  grid = 4,
  gridStyle,
  boxStyle,
}) => {
  const classes = useStyles(hover);

  return (
    <Box p={3} className={classes.container} style={boxStyle}>
      <Grid
        container
        style={{ gridStyle }}
        // maybe the following attribute are unnessesary!!!
        alignContent="center"
        alignItems="center"
      >
        {children.map((item, key) => (
          <Grid
            //todo: need better key value
            // the item here is JSX, I don't have access to item._id or item as string
            key={key}
            item
            style={{ flexBasis: `${100 / grid}%` }}
            align="center"
          >
            <Box py={1}>{item}</Box>
          </Grid>
        ))}

        <Grid item style={{ flexBasis: `${100 / grid}%` }} align="center">
          <Box py={1}>{append}</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const AddCategory = () => {
  return (
    <LinkTo to="/category/add">
      <IconButton disableRipple style={{ border: "2px dotted #9e9e9e" }}>
        <Add />
      </IconButton>
      <Typography variant="body1">Add Category</Typography>
    </LinkTo>
  );
};

/**
 * @desc to display all children without any extra styling AND add extra icon for adding files
 */
const CatBoxStatic = ({ children, append = <AddCategory /> }) => {
  return (
    <CatBox hover={false} append={append}>
      {children}
    </CatBox>
  );
};

const Label = ({ children, error }) => (
  <Typography
    color="textSecondary"
    style={{
      color: error ? "#f44336" : "inherit",
      fontSize: "0.75rem",
      position: "absolute",
      top: -13,
      left: 8,
      //todo: this has to change when haviing dark background
      backgroundColor: "white",
      padding: "5px",
    }}
    variant="body1"
  >
    {children}
  </Typography>
);
const Helper = ({ children }) => (
  <Typography
    color="textSecondary"
    style={{
      fontSize: "0.75rem",
      marginBottom: "1rem",
      marginTop: "-1rem",
      color: "#f44336",
      //todo: this has to change when haviing dark background
      padding: "5px",
    }}
    variant="body1"
  >
    {children}
  </Typography>
);
/**
 * @desc act like a form field and have value and onChange like any form field
 */

const CatBoxDynamic = ({ error, helperText, children, grid }) => {
  return (
    <div style={{ position: "relative" }}>
      <Label error={error}>Category</Label>
      <CatBox
        boxStyle={error ? { border: "1.2px solid #f44336" } : {}}
        grid={grid}
        hover
      >
        {children}
      </CatBox>
      {error && <Helper>{helperText}</Helper>}
    </div>
  );
};

const CatBoxDynamicSmall = ({
  gitDemoProp,
  error,
  helperText,
  label,
  children,
  fixHieght,
  grid = 4,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <Label error={error}> {label} </Label>
      <CatBox
        boxStyle={error ? { border: "1.2px solid #f44336" } : {}}
        gridStyle={fixHieght && { height: 36, marginTop: 15 }}
        grid={grid}
        hover
      >
        {children}
      </CatBox>
      {error && <Helper>{helperText}</Helper>}
    </div>
  );
};

export { CatBox, CatBoxStatic, CatBoxDynamic, CatBoxDynamicSmall };
