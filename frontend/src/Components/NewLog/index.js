import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// materia ui
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { addLog } from "../../redux/Actions/LogsAtions";
import { CategoryListField } from "../Category/Fields-Lists";
import { Formik } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";
import http from "../../redux/Actions/http";

const NewLog = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Container disableGutters maxWidth="sm">
      <Paper>
        <Box p={3} mt={3}>
          <Typography variant="h2" align="center">
            Add New Entries
          </Typography>
          <Divider className={classes.mb_2} />
          <Formik
            initialValues={{
              title: "",
              amount: "",
              category: "",
              note: "",
            }}
            validate={(vals) => {
              const errors = {};
              if (!vals.title) errors.title = "required";
              if (!vals.amount) errors.amount = "required";
              else if (!Number(vals.amount))
                errors.amount = "amount must be a number";
              if (!vals.category) errors.category = "required";

              return errors;
            }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              const [done, error] = await http(addLog(values));
              if (error) setErrors(error.errors);
              if (done) history.push("/");
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleReset,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  error={touched.title && errors.title}
                  helperText={touched.title && errors.title}
                  className={classes.w50}
                  value={values.title}
                  onChange={handleChange}
                  variant="outlined"
                  id="title"
                  name="title"
                  label="log title"
                />
                <TextField
                  error={touched.amount && errors.amount}
                  helperText={touched.amount && errors.amount}
                  className={classes.w50}
                  value={values.amount}
                  onChange={handleChange}
                  variant="outlined"
                  id="amount"
                  name="amount"
                  label="Amount of money"
                />

                <CategoryListField
                  error={touched.category && errors.category}
                  helperText={touched.category && errors.category}
                  id="category"
                  value={values.category}
                  onChange={handleChange}
                  name="category"
                  label="Amount of money"
                ></CategoryListField>

                <TextField
                  error={touched.note && errors.note}
                  helperText={touched.note && errors.note}
                  className={classes.w50}
                  value={values.note}
                  onChange={handleChange}
                  name="note"
                  variant="outlined"
                  id="note"
                  label="Add notes"
                  multiline
                  rows={4}
                />
                <Button
                  type="submit"
                  size="large"
                  className={classes.w50}
                  startIcon={<AddCircleIcon fontSize="large" />}
                  variant="contained"
                  color="secondary"
                >
                  <Typography variant="h6">
                    {isSubmitting && (
                      <CircularProgress
                        style={{ marginRight: "1rem" }}
                        size={20}
                      />
                    )}
                    Add log
                  </Typography>
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Container>
  );
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

export default NewLog;
