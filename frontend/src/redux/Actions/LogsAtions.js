const fetch_url = process.env.REACT_APP_SERVER_URL;

const auth = () => ({
  authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
});

const json = {
  "content-type": "application/json",
  Accept: "*/*",
};

// todo: need better way to destruct the error response
const throwError = (body, status) => {
  const err = new Error();
  err.sign = "http error";
  err.body = body;
  err.status = status;
  throw err;
};

const deleteLog = (id) => async (dispatch, state) => {
  const config = {
    method: "DELETE",
    headers: { ...auth() },
  };
  const res = await fetch(`${fetch_url}/log/${id}`, config);
  const resjson = await res.json();

  if (!res.ok) throwError(resjson, res.status);

  dispatch({
    type: "log/delete",
    payload: id,
  });

  return resjson;
};

const revertDeleteLog = (id) => async (dispatch, state) => {
  const config = {
    method: "DELETE",
    headers: auth(),
  };
  const res = await fetch(`${fetch_url}/log/${id}?revert=ture`, config);
  const resjson = await res.json();

  if (!res.ok) throwError(resjson, res.status);

  return resjson;
};

const addLog = (data) => async (dispatch, state) => {
  const config = {
    method: "POST",
    headers: { ...json, ...auth() },
    body: JSON.stringify(data),
  };
  const res = await fetch(`${fetch_url}/log`, config);
  const resjson = await res.json();

  if (!res.ok) throwError(resjson, res.status);

  dispatch({
    type: "log/add",
    payload: [resjson],
  });

  return resjson;
};

const updateLog = (data) => async (dispatch, state) => {
  const config = {
    method: "PUT",
    headers: { ...json, ...auth() },
    body: JSON.stringify(data),
  };
  const res = await fetch(`${fetch_url}/log/${data._id}`, config);
  const resjson = await res.json();
  if (!res.ok) throwError(resjson, res.status);

  dispatch({
    type: "log/update",
    payload: resjson,
  });

  return resjson;
};

const getLogs = () => async (dispatch, state) => {
  const config = {
    headers: { ...auth() },
  };

  const res = await fetch(`${fetch_url}/log`, config);
  if (res.status === 204) throwError("No Content Available", 204);
  const resjson = await res.json();
  if (!res.ok) throwError(resjson, res.status);

  dispatch({
    type: "log/replace",
    payload: resjson,
  });

  //todo: do I have to return the resjson here?
};

const getLog = (id) => async (dispatch, state) => {
  const config = {
    headers: { ...auth() },
  };

  const res = await fetch(`${fetch_url}/log/${id}`, config);
  const resjson = await res.json();

  if (!res.ok) throwError(resjson, res.status);

  dispatch({
    type: "log/updateOrAdd",
    payload: resjson,
  });

  //todo: do I have to return the resjson here?
};

export { getLog, getLogs, updateLog, addLog, deleteLog, revertDeleteLog };
