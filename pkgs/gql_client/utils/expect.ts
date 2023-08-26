import { expect } from "@jest/globals";
import { Response } from "node-fetch";

export function expectResponse(res: Response) {
  expect(String(res.status)[0]).toBe("2");
  expect(res.headers.get("x-token"));
}

export const profileRest = {
  created_at: expect.any(Number),
  updated_at: expect.any(Number),
  id: expect.any(String),
};

export const profile = {
  createdAt: expect.any(Number),
  updatedAt: expect.any(Number),
  id: expect.any(String),
};
