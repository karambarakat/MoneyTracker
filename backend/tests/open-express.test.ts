import { app } from "../src/server"
import express from "express"

test('open express', () => {
  expect(app).toBeDefined()
})