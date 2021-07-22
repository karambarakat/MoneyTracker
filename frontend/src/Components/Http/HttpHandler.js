import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { v4 as uuid } from "uuid";
const getAction =
  (action, httpId, handlerMetaData) => async (dispatch, state) => {
    try {
      dispatch({
        type: "http/request",
        httpId,
        meta: handlerMetaData,
      });

      const reduxAction = action();

      await reduxAction(dispatch, state);

      dispatch({
        type: "http/seccess",
        httpId,
      });
    } catch (error) {
      console.log("error");
      dispatch({
        type: "http/error",
        httpId,
        error,
      });
    }
  };

export const HttpHandler = ({
  action,
  selector,
  children,
  Loading = () => <h1>loading</h1>,
  Empty = () => <h1>noting to be shown</h1>,
  showIfEmpty = true, //if false need to pass 'Empty' page
  Error = ({ readyState }) => (
    <h1>
      {readyState.error.code} | {readyState.error.message}
    </h1>
  ),
  Generic,
}) => {
  //initialize the component
  const { path, params } = useRouteMatch();
  const handlerMetaData = {
    path,
    params,
  };
  const [httpId] = useState(uuid());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAction(action, httpId, handlerMetaData));
    return () => {
      dispatch({ type: "http/clean", httpId });
    };
  }, [dispatch]);

  //select all relavent data
  const httpRequest = useSelector((state) => state.httpRequests[httpId]);
  const childData = useSelector(selector);
  const readyState = httpRequest && httpRequest.readyState;
  const json = JSON.stringify(childData);
  const childDataIsEmptyArray = json === "{}" || json === "[]";

  // if there is data in Redux show it anyway regardless of the http request
  if (childData && !childDataIsEmptyArray) return children(childData);

  if (readyState === "request") return <Loading />;

  if (readyState === "success") {
    if (showIfEmpty) return children(childData);
    if (!childData || childDataIsEmptyArray) return <Empty />;

    return children(childData);
  }

  if (readyState === "error") return <Error />;

  return <h1>oops | somthing went wrong</h1>;
};
