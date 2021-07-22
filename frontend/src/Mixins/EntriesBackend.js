import metaData from "./ServerMetaData";
let fetch_url = metaData.fetch_url;

export const fetchAll = async () => {
  const res = await fetch(`${fetch_url}/Entries`);
  if (res.status === 404 && !res.ok) {
    throw new Error("Server Error 404");
  } else {
    const resjson = await res.json();

    const comparisonSrg = JSON.stringify(resjson);
    if (comparisonSrg === "{}" || comparisonSrg === "[]") {
      throw new Error("No Entries Found");
    } else {
      return resjson;
    }
  }
};

export const fetchOne = async (id) => {
  const res = await fetch(`${fetch_url}/Entries/${id}`);
  if (res.status === 404 && !res.ok) {
    throw new Error("data not found");
  } else {
    const resjson = await res.json();
    const comparisonSrg = JSON.stringify(resjson);
    if (comparisonSrg === "{}" || comparisonSrg === "[]") {
      throw new Error("empty response");
    } else {
      return resjson;
    }
  }
};

export const addEntry = async (input) => {
  input.Date = new Date();
  const res = await fetch(`${fetch_url}/Entries`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(input),
  });
  if (res.status === 404 && !res.ok) {
    throw new Error();
  } else {
    const resjson = await res.json();
    return resjson;
  }
};

export const updateEntry = async (id, input) => {
  input.Date = new Date();
  const res = await fetch(`${fetch_url}/Entries/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(input),
  });
  if (res.status === 404 && !res.ok) {
    throw new Error();
  } else {
    const resjson = await res.json();
    return resjson;
  }
};

export const deleteEntry = async (id) => {
  const res = await fetch(`${fetch_url}/Entries/${id}`, {
    method: "DELETE",
  });
  if (res.status === 404 && !res.ok) {
    throw new Error();
  } else {
    const resjson = await res.json();
    return resjson;
  }
};
