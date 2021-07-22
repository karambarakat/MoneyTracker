import metaData from "./ServerMetaData";
const { fetch_url, token } = metaData;

const auth = {
  authorization: `Bearer ${token}`,
};

const auth_accept = {
  authorization: `Bearer ${token}`,
  "content-type": "application/json",
  Accept: "*/*",
};

const auth_get = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};

// todo: need better way to destruct the error response
const throwError = (obj) => {
  const err = new Error();
  err.obj = obj;
  let errorsFormated = {};
  obj.errorsList.map((e) => (errorsFormated[e.error] = e.message));
  err.errors = errorsFormated;

  throw err;
};

export const deleteLog = (id) => async (dispatch, state) => {
  const config = {
    method: "DELETE",
    headers: auth,
  };
  const res = await fetch(`${fetch_url}/log/${id}`, config);
  const resjson = await res.json();

  if (!res.ok) throwError(resjson);

  dispatch({
    type: "log/delete",
    payload: id,
  });

  return resjson;
};

export const addLog = (data) => async (dispatch, state) => {
  const config = {
    method: "POST",
    headers: auth_accept,
    body: JSON.stringify(data),
  };
  const res = await fetch(`${fetch_url}/log`, config);
  const resjson = await res.json();

  if (!res.ok) throwError(resjson);

  dispatch({
    type: "log/add",
    payload: [resjson],
  });

  return resjson;
};

export const updateLog = (data) => async (dispatch, state) => {
  const config = {
    method: "PUT",
    headers: auth_accept,
    body: JSON.stringify(data),
  };
  const res = await fetch(`${fetch_url}/log/${data._id}`, config);
  const resjson = await res.json();

  if (!res.ok) throwError(resjson);

  dispatch({
    type: "log/update",
    payload: resjson,
  });

  return resjson;
};

export const getLogs = () => async (dispatch, state) => {
  const res = await fetch(`${fetch_url}/log`, auth_get);
  const resjson = await res.json();

  if (!res.ok) throwError(resjson);

  dispatch({
    type: "log/replace",
    payload: resjson,
  });

  //todo: do I have to return the resjson here?
};

export const getLog = (id) => async (dispatch, state) => {
  const res = await fetch(`${fetch_url}/log/${id}`, auth_get);
  const resjson = await res.json();

  if (!res.ok) throwError(resjson);

  dispatch({
    type: "log/updateOrAdd",
    payload: resjson,
  });

  //todo: do I have to return the resjson here?
};