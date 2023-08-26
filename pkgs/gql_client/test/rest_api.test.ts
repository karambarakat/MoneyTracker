import { it, expect } from "@jest/globals";
import gql from "../utils/gql";
import { REST_API } from "../utils/constants";
import fetch from "node-fetch";

it("api is working", async () => {
  const input = [REST_API + "/", {}] as const;
  const res = await fetch(...input).then((res) => res.body?.read().toString());

  expect(input).toMatchSnapshot();
  expect(res).toMatchSnapshot();
});

it("not found", async () => {
  // const res = await fetch(REST_API + "/notFound");
  const input = [REST_API + "/notFound", {}] as const;
  const res = await fetch(...input).then((res) => res.json());

  expect(input).toMatchSnapshot();
  expect(res).toMatchSnapshot();
});
