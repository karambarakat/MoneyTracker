import { it, expect } from "@jest/globals";
import gql, { getAsString } from "../utils/gql";

const posts = gql`
  query new {
    getAllCategories {
      id
    }
  }
`;

const obj = {} as any;

it("test1", async () => {
  expect(getAsString(posts)).toEqual(true);
});
