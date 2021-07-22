import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// component
import { updatelog } from "../../Mixins/EntriesBackend";
import CategoryListForEntries from "../Category/CategoryListForEntries";

// import CategoryList from "../Category/CategoryList";
// material ui
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const UpdateLog = ({ log, noHeader, onSubmitCB = () => {} }) => {
  const [Form, onChange, onSubmit, onCatChange] = useForm(log, onSubmitCB);
  const classes = useStyles();
  return (
    <>
      {!noHeader && (
        <>
          <Typography variant="h2" align="center">
            Update Log
          </Typography>
          <Divider className={classes.mb_2} />{" "}
        </>
      )}

      <form onSubmit={onSubmit}>
        <TextField
          className={classes.w50}
          value={Form.Title}
          onChange={onChange}
          variant="outlined"
          id="Title"
          label="Log title"
        />
        <TextField
          className={classes.w50}
          value={Form.Amount}
          onChange={onChange}
          variant="outlined"
          id="Amount"
          label="Amount of money"
        />
        <CategoryListForEntries
          onChange={onCatChange}
          value={Form.Category}
          className={classes.w50}
        ></CategoryListForEntries>
        <TextField
          className={classes.w50}
          value={Form.Notes}
          onChange={onChange}
          variant="outlined"
          id="Notes"
          label="Add notes"
          multiline
          rows={4}
        />
        <Button
          type="submit"
          size="large"
          className={classes.w50}
          variant="contained"
          color="secondary"
        >
          <Typography variant="h6">Update</Typography>
        </Button>
      </form>
    </>
  );
};
const useForm = (log, onSubmitCB) => {
  const workinglog = useSelector((state) => state.workinglog);
  const Form = workinglog.live;
  const dispatch = useDispatch();

  const onChange = (event) => {
    let type = event.target.id;
    let value = event.target.value;
  };
  const onCatChange = (value) => {
    dispatch({
      type: "workinglog/update",
      payload: { ...Form, Category: value },
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // there is a bug I couldn't solve, the following 'if statement' is going to 'ignore' this bug
    // the bug is that whenever I didn't change the data in the form and click update the react app break
    // but when i change some feild like title for example this work as intended: send put requst , update the data and display the newer version of data
    if (JSON.stringify(Form) === JSON.stringify(workinglog.clean)) {
      console.log("bug detected");
      return;
    }
    onSubmitCB();
    // updatelog(data.id, Form)
    //   .then(() => {
    //     dispatch({ type: "log/update", payload: { Form, id: Form.id } });
    //   })
    //   .catch((e) => {});
  };
  return [Form, onChange, onSubmit, onCatChange];
};

const useStyles = makeStyles((theme) => ({
  mb_2: {
    marginBottom: theme.spacing(2),
  },
  w50: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));
export default UpdateLog;
