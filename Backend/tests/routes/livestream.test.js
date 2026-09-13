import request from "supertest";
import { connectTestDb, closeTestDb, clearTestDb } from "../setupDb.js";
import { createAdmin, tokenFor } from "../helpers.js";

jest.mock("../../utils/notifyNewSubmission.js", () => ({ notifyNewSubmission: jest.fn() }));
jest.mock("../../socket.js", () => ({ initSocket: jest.fn(), emitNewLead: jest.fn() }));

let app;
let LivestreamRequest;

beforeAll(async () => {
  await connectTestDb();
  app = (await import("../../app.js")).default;
  LivestreamRequest = (await import("../../models/LivestreamRequest.js")).default;
});

afterEach(async () => {
  await clearTestDb();
  jest.clearAllMocks();
});

afterAll(async () => {
  await closeTestDb();
});

it("POST saves a valid livestream request", async () => {
  const res = await request(app)
    .post("/api/v1/livestream")
    .send({ fullName: "Jane", email: "jane@example.com", eventType: "Conference" });

  expect(res.status).toBe(201);
  expect(await LivestreamRequest.countDocuments()).toBe(1);
});

it("POST rejects a request missing required fields", async () => {
  const res = await request(app).post("/api/v1/livestream").send({ fullName: "Jane" });
  expect(res.status).toBe(400);
});

it("GET requires auth and lists requests when authenticated", async () => {
  const unauth = await request(app).get("/api/v1/livestream");
  expect(unauth.status).toBe(401);

  const admin = await createAdmin();
  await LivestreamRequest.create({ fullName: "Jane", email: "jane@example.com", eventType: "Conference" });

  const res = await request(app).get("/api/v1/livestream").set("Authorization", `Bearer ${tokenFor(admin)}`);
  expect(res.status).toBe(200);
  expect(res.body.total).toBe(1);
});

it("PATCH status updates a valid status and 404s for an unknown id", async () => {
  const admin = await createAdmin();
  const token = tokenFor(admin);
  const req = await LivestreamRequest.create({ fullName: "Jane", email: "jane@example.com", eventType: "Conference" });

  const ok = await request(app)
    .patch(`/api/v1/livestream/${req._id}/status`)
    .set("Authorization", `Bearer ${token}`)
    .send({ status: "won" });
  expect(ok.status).toBe(200);
  expect(ok.body.status).toBe("won");

  const notFound = await request(app)
    .patch("/api/v1/livestream/aaaaaaaaaaaaaaaaaaaaaaaa/status")
    .set("Authorization", `Bearer ${token}`)
    .send({ status: "won" });
  expect(notFound.status).toBe(404);
});

it("DELETE soft-deletes and is admin-only", async () => {
  const staff = await createAdmin({ email: "staff@example.com", role: "staff" });
  const req = await LivestreamRequest.create({ fullName: "Jane", email: "jane@example.com", eventType: "Conference" });

  const forbidden = await request(app)
    .delete(`/api/v1/livestream/${req._id}`)
    .set("Authorization", `Bearer ${tokenFor(staff)}`);
  expect(forbidden.status).toBe(403);
});
