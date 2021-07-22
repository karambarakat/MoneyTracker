import React from "react";
import Typography from "@material-ui/core/Typography";
import EntryItem from "./EntryItem";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const Summary = ({ categories, grandTotal }) => {
  console.log(categories);
  return (
    <div>
      <Typography variant="caption">Expenses list</Typography>
      <List>
        {categories.map((e) => {
          return (
            <Link
              style={{
                textDecoration: "initial",
                color: "initial",
              }}
              // to={{
              //   pathname: `${url}entry/${e.id}`,
              //   state: { background: location, path: "/entry/:id" },
              // }}
            >
              <EntryItem firstTotal={categories[0].Total} data={e} />
            </Link>
          );
        })}
      </List>
    </div>
  );
};

export default Summary;
