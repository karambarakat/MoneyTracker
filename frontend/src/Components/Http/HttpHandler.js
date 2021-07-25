import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "../../redux/Actions/http";
import { v4 as uuid } from "uuid";
import ErrorComponent from "./Error";
import LoadingComponent from "./Loading";

/**
 * old action to handle http request
 */
// const getAction =
//   (action, httpId, handlerMetaData) => async (dispatch, state) => {
//     try {
//       dispatch({
//         type: "http/request",
//         httpId,
//         meta: handlerMetaData,
//       });

//       await action(dispatch, state);

//       dispatch({
//         type: "http/seccess",
//         httpId,
//       });
//     } catch (error) {
//       console.log("error");
//       dispatch({
//         type: "http/error",
//         httpId,
//         error,
//       });
//     }
//   };

export const HttpHandler = ({
  action,
  selector,
  falsySelector,
  children,
  Loading = LoadingComponent,
  Error = ErrorComponent,
  loadingVariant,
  errorVariant,
  //option booleans
  // showComponentIfThereIsData = true,
  // showComponentIfThereIsError = true,
}) => {
  //initialize the component
  const [httpId] = useState(uuid());
  const dispatch = useDispatch();

  //fire request and action
  useEffect(() => {
    const fetching = async () => {
      await http(action, httpId);
    };
    fetching();
    return () => {
      dispatch({ type: "http/clean", httpId });
    };
  }, [dispatch]);

  //select all relavent data
  const httpRequests = useSelector((state) => state.httpRequests);
  const selectorData = useSelector(selector);
  const readyState = httpRequests[httpId]?.readyState;

  //option booleans:
  //add to fillfilled as OR STATMENT "||"
  //const show = showComponentIfThereIsData && selectorData
  //const show2 = showComponentIfThereIsError && readyState === "error"

  //fullfiled action
  if (readyState === "success" || selectorData)
    return selectorData ? children(selectorData) : falsySelector;

  // loading data
  if (readyState === "request") return <Loading variant={loadingVariant} />;

  //rejected action
  if (readyState === "error")
    return (
      <Error
        //todo: the error passed here is buggy
        code={httpRequests[httpId].error.status}
        variant={errorVariant}
        error={httpRequests[httpId].error}
      />
    );

  //if reached here; there is bug in this component or in the action
  //to prevent error
  return <h1>some error occured</h1>;
};
