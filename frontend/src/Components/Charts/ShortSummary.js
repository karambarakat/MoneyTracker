import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const ShortSummary = ({ categories, grandTotal }) => {
  let colorsFill = ["#e3e334", "#31ebde", "#21eb32", "#f2723f", "#b0b0b0"];

  return (
    <>
      {categories.map((e, i) => (
        <Grid container alignItems="center" style={{ marginBottom: "1rem" }}>
          <Grid item style={{ marginRight: "1rem" }}>
            <svg fill={colorsFill[i]} width="1rem" height="1rem">
              <circle cx="0.5rem" cy="0.5rem" r="0.5rem" />
            </svg>
          </Grid>
          <Grid item style={{ marginRight: "auto" }}>
            <Typography>{e.CategoryTitle}</Typography>
          </Grid>
          <Grid item>
            <Typography>
              {((e.Total / grandTotal) * 100).toFixed(2)}%
            </Typography>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default ShortSummary;
