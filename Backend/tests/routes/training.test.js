import request from "supertest";
import { connectTestDb, closeTestDb, clearTestDb } from "../setupDb.js";
import { createAdmin, tokenFor } from "../helpers.js";

jest.mock("../../utils/notifyNewSubmission.js", () => ({ notifyNewSubmission: jest.fn() }));
jest.mock("../../socket.js", () => ({ initSocket: jest.fn(), emitNewLead: jest.fn() }));

let app;
let TrainingEnrollment;

beforeAll(async () => {
  await connectTestDb();
  app = (await import("../../app.js")).default;
  TrainingEnrollment = (await import("../../models/TrainingEnrollment.js")).default;
});

afterEach(async () => {
  await clearTestDb();
  jest.clearAllMocks();
});

afterAll(async () => {
  await closeTestDb();
});

const validPayload = {
  fullName: "Jane",
  email: "jane@example.com",
  phone: "555-1234",
  focus: "Podcasting",
  mode: "online",
};

it("POST saves a valid enrollment", async () => {
  const res = await request(app).post("/api/v1/training").send(validPayload);
  expect(res.status).toBe(201);
  expect(await TrainingEnrollment.countDocuments()).toBe(1);
});

it("POST rejects an invalid mode enum value", async () => {
  const res = await request(app).post("/api/v1/training").send({ ...validPayload, mode: "remote" });
  expect(res.status).toBe(400);
});

it("GET requires auth and lists enrollments when authenticated", async () => {
  const unauth = await request(app).get("/api/v1/training");
  expect(unauth.status).toBe(401);

  const admin = await createAdmin();
  await TrainingEnrollment.create(validPayload);

  const res = await request(app).get("/api/v1/training").set("Authorization", `Bearer ${tokenFor(admin)}`);
  expect(res.status).toBe(200);
  expect(res.body.total).toBe(1);
});

it("PATCH status updates status", async () => {
  const admin = await createAdmin();
  const enrollment = await TrainingEnrollment.create(validPayload);

  const res = await request(app)
    .patch(`/api/v1/training/${enrollment._id}/status`)
    .set("Authorization", `Bearer ${tokenFor(admin)}`)
    .send({ status: "confirmed" });

  expect(res.status).toBe(200);
  expect(res.body.status).toBe("confirmed");
});

it("DELETE soft-deletes and is admin-only", async () => {
  const staff = await createAdmin({ email: "staff@example.com", role: "staff" });
  const admin = await createAdmin({ email: "admin2@example.com", role: "admin" });
  const enrollment = await TrainingEnrollment.create(validPayload);

  const forbidden = await request(app)
    .delete(`/api/v1/training/${enrollment._id}`)
    .set("Authorization", `Bearer ${tokenFor(staff)}`);
  expect(forbidden.status).toBe(403);

  const ok = await request(app)
    .delete(`/api/v1/training/${enrollment._id}`)
    .set("Authorization", `Bearer ${tokenFor(admin)}`);
  expect(ok.status).toBe(200);

  const stillThere = await TrainingEnrollment.findById(enrollment._id);
  expect(stillThere.deletedAt).not.toBeNull();
});
