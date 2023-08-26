import { afterAll, beforeAll, expect, it } from "@jest/globals";
import gql, { getGqlInput } from "../utils/gql";
import fetch from "node-fetch";
import { GRAPHQL, HELPER_SERVER, REST_API } from "../utils/constants";
import { request } from "graphql-request";
import { profile } from "../utils/expect";

const ctx: any = {
  ids: [],
};

/* Graphql */
const get_current_user = gql`
  query get_current_profile {
    getCurrentUser {
      id
      email
      displayName
      avatar
      providers
      createdAt
      updatedAt
    }
  }
`;

beforeAll(async () => {
  const res = await fetch(REST_API + "/auth/local/register", {
    method: "POST",
    headers: {
      content: "application/json",
      authorization:
        "Basic " + Buffer.from("testing_profile@m.c:pass").toString("base64"),
    },
    body: JSON.stringify({}),
  });
  const json: any = await res.json();
  ctx.user = Object.assign({}, json);
  ctx.ids.push(json.id);
  ctx.user.token = res.headers.get("x-token");
  ctx.user.headers = {
    authorization: "Bearer " + ctx.user.token,
  };
});

it("wtf", async () => {
  const data = await request(GRAPHQL, get_current_user, {}, ctx.user.headers);

  // expect(data.getCurrentUser).toMatchSnapshot(profile);
  expect(data.getCurrentUser).toMatchSnapshot(profile);
});

afterAll(async () => {
  await Promise.all(
    ctx.ids.map((id: string) =>
      fetch(HELPER_SERVER + "/remove_user_data/" + id)
    )
  );
});
