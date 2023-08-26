import { expect, it, jest } from "@jest/globals";
import extend from "./extend";

const logs: string[] = [];

jest.setTimeout(3000);
jest.replaceProperty;

const rename = extend({
  fix1: async (_, use) => {
    logs.push("fix 1 buildup");
    await use({ test: "fix 1 works" });
    logs.push("fix 1 teardown");
  },
  fix2: async (_, use) => {
    await new Promise((res) => setTimeout(res, 1000));
    logs.push("fix 2 buildup");
    await use({ test: "fix 2 works" });
    logs.push("fix 2 teardown");
  },
});

rename("test1", async ({ fix1, fix2 }) => {
  logs.push("test 1 ran");

  expect(fix1).toEqual({ test: "fix 1 works" });
  expect(fix2).toEqual({ test: "fix 2 works" });
});

it("previous call must be called", async () => {
  expect(logs).toEqual([
    "fix 1 buildup",
    "fix 2 buildup",
    "test 1 ran",
    "fix 1 teardown",
    "fix 2 teardown",
  ]);
});
1;
