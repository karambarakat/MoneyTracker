import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const ShortSummary = ({ nestedLogs, grandTotal }) => {
  let colorsFill = nestedLogs.map((e) => e.category.color);

  return (
    <>
      {nestedLogs.map((e, i) => (
        <Grid container alignItems="center" style={{ marginBottom: "1rem" }}>
          <Grid item style={{ marginRight: "1rem" }}>
            <svg fill={`#${colorsFill[i]}`} width="1rem" height="1rem">
              <circle cx="0.5rem" cy="0.5rem" r="0.5rem" />
            </svg>
          </Grid>
          <Grid item style={{ marginRight: "auto" }}>
            <Typography>{e.category.title}</Typography>
          </Grid>
          <Grid item>
            <Typography>{(e.percentageRTTotal * 100).toFixed(2)}%</Typography>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default ShortSummary;
