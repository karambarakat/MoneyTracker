import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ContainerCustom from "../ContainerCustom";
import { useRouteMatch } from "react-router-dom";
import { Formik } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import { CategoryIconsField, CategoryColorsField } from "./Fields-Lists";

const CategoryForm = ({ category, Heading, submitForm, deletebtn, action }) => {
  const classes = useStyles();

  return (
    <ContainerCustom>
      <Typography variant="h2" align="center">
        {Heading}
      </Typography>
      <Divider style={{ marginBottom: "16px" }} />
      <Formik
        initialValues={category || { title: "", color: "6074ff", icon: "Star" }}
        validate={(vals) => {
          const errors = {};
          if (!vals.title) errors.title = "title is required";
          else if (!typeof vals.title === "string")
            errors.title = "title must be string";
          else if (vals.title === "" || vals.title === " ")
            errors.title = "title must not be empty";
          if (!vals.color) errors.color = "color is required";
          if (!vals.icon) errors.icon = "ison is required";
          return errors;
        }}
        onSubmit={submitForm}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              error={touched.title && errors.title}
              helperText={touched.icon && errors.title}
              className={classes.w50}
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              name="title"
              variant="outlined"
              id="titleInput"
              label="Category title"
            />
            <CategoryColorsField
              error={touched.color && errors.color}
              helperText={touched.icon && errors.color}
              value={values.color}
              onChange={handleChange("color")}
            />

            <CategoryIconsField
              error={touched.icon && errors.icon}
              helperText={touched.icon && errors.icon}
              value={values.icon}
              onChange={handleChange("icon")}
              colorValue={values.color}
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              size="large"
              className={classes.w50}
              variant="contained"
              color="primary"
            >
              <Typography variant="h6">
                {isSubmitting && (
                  <CircularProgress style={{ marginRight: "1rem" }} size={20} />
                )}
                {action}
              </Typography>
            </Button>
            {deletebtn && (
              <Button
                disabled={isSubmitting}
                size="large"
                onClick={deletebtn}
                className={classes.w50}
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
                  Delete Category
                </Typography>
              </Button>
            )}
          </form>
        )}
      </Formik>
    </ContainerCustom>
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
  formControl: {
    minWidth: 240,
  },
}));

export default CategoryForm;
