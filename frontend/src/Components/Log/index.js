import React, { useState, useEffect } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import http from "../../redux/Actions/http";

import { Formik, Form, ErrorMessage, Field } from "formik";
import {
  getLog,
  deleteLog,
  getLogs,
  updateLog,
} from "../../redux/Actions/LogsAtions";
import { useDispatch, useSelector } from "react-redux";
// import UpdateLog from "./_UpdateLog";
import LogHeader from "./LogHeader";
import LogDetails from "./LogDetails";
import { HttpHandler } from "../Http/HttpHandler";
// Material UI
import ContainerCustom from "../ContainerCustom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CategoryListField } from "../Category/Fields-Lists";

const Log = () => {
  const classes = useStyles();
  let { id } = useParams();
  let history = useHistory();
  const [isUpdate, setIsUpdate] = useState(false);
  const toggleIsUpdate = () => setIsUpdate(!isUpdate);
  const categories = useSelector((state) => state.categories);
  const popCat = (formLog, log) => {
    const getCat = (id) => categories.find((e) => e._id === id);
    formLog._category = getCat(formLog.category) || log.category;
    formLog.createdAt = log.createdAt;
    return formLog;
  };

  return (
    <HttpHandler
      action={getLog(id)}
      selector={(state) => state.logs && state.logs.find((e) => e._id === id)}
    >
      {(log) => (
        <ContainerCustom>
          <Formik
            initialValues={{
              title: log.title,
              amount: log.amount,
              category: log.category._id,
              note: log.note,
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
              let json = {
                ...values,
                _id: log._id,
                category: values._category,
              };
              const [done, error] = await http(updateLog(json));
              if (error) setErrors(error.errors);
              if (done) {
                toggleIsUpdate();
                history.push(`/log/${id}`);
              }
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
              <>
                <LogHeader
                  log={popCat(values, log)}
                  // onDelete={onDelete}
                  toggle={() => {
                    toggleIsUpdate();
                    handleReset();
                  }}
                  isUpdate={isUpdate}
                />

                {isUpdate ? (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      className={classes.w50}
                      value={values.title}
                      error={touched.title && errors.title}
                      helperText={errors.title}
                      onChange={handleChange}
                      name="title"
                      variant="outlined"
                      id="titleInput"
                      label="Log title"
                    />
                    <TextField
                      className={classes.w50}
                      value={values.amount}
                      error={touched.amount && errors.amount}
                      helperText={errors.amount}
                      onChange={handleChange}
                      name="amount"
                      onBlur={handleBlur}
                      variant="outlined"
                      id="amountInput"
                      label="Amount of money"
                    />
                    <CategoryListField
                      value={values.category}
                      error={touched.category && errors.category}
                      helperText={errors.category}
                      onChange={handleChange("category")}
                    />
                    <TextField
                      className={classes.w50}
                      value={values.note}
                      error={touched.note && errors.note}
                      helperText={errors.note}
                      name="note"
                      onChange={handleChange}
                      variant="outlined"
                      id="noteInput"
                      label="Add notes"
                      multiline
                      rows={4}
                    />
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      size="large"
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
                        Update
                      </Typography>
                    </Button>
                  </form>
                ) : (
                  <LogDetails log={popCat(values, log)} />
                )}
              </>
            )}
          </Formik>
        </ContainerCustom>
      )}
    </HttpHandler>
  );
};

const useCB = (data) => {
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = useState(false);
  const onDelete = function () {
    // deletelog(data?.id)
    //   .then(() => {
    //     dispatch({ type: "gallery/close" });
    //     dispatch({ type: "refresh" });
    //     dispatch({
    //       type: "notistack",
    //       payload: `${data?.Title} has been deleted`,
    //     });
    //   })
    //   .catch(() => {
    //     dispatch({
    //       type: "notistack",
    //       payload: "404 server error",
    //     });
    //   });
    // history.goBack();
  };
  const onUpdate = function () {
    setIsUpdate(!isUpdate);
    dispatch({ type: "workinglog/setLiveToClean" });
  };

  return [onDelete, onUpdate, isUpdate];
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

export default Log;
