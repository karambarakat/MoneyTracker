import metaData from "./ServerMetaData";
let fetch_url = metaData.fetch_url;

export const fetchAll = async () => {
  const res = await fetch(`${fetch_url}/Categories`);
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

export const addCategory = async (input) => {
  const res = await fetch(`${fetch_url}/Categories`, {
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

export const updateCategory = async (id, input) => {
  const res = await fetch(`${fetch_url}/Categories/${id}`, {
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

export const deleteCategory = async (id) => {
  const res = await fetch(`${fetch_url}/Categories/${id}`, {
    method: "DELETE",
  });
  if (res.status === 404 && !res.ok) {
    throw new Error();
  } else {
    const resjson = await res.json();
    return resjson;
  }
};
