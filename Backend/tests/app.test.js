import request from "supertest";
import mongoose from "mongoose";
import { connectTestDb, closeTestDb } from "./setupDb.js";

let app;

beforeAll(async () => {
  await connectTestDb();
  app = (await import("../app.js")).default;
});

afterAll(async () => {
  await closeTestDb();
});

it("GET /health reports ok status, uptime, and a connected db state", async () => {
  const res = await request(app).get("/health");

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("ok");
  expect(res.body.uptime).toEqual(expect.any(Number));
  expect(res.body.dbState).toBe(mongoose.connection.readyState);
  expect(res.body.dbState).toBe(1); // connected
});
