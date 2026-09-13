import request from "supertest";
import { connectTestDb, closeTestDb, clearTestDb } from "../setupDb.js";
import { createAdmin, tokenFor } from "../helpers.js";

let app;
let AuditLog;

beforeAll(async () => {
  await connectTestDb();
  app = (await import("../../app.js")).default;
  AuditLog = (await import("../../models/AuditLog.js")).default;
});

afterEach(async () => {
  await clearTestDb();
});

afterAll(async () => {
  await closeTestDb();
});

it("requires authentication", async () => {
  const res = await request(app).get("/api/v1/audit");
  expect(res.status).toBe(401);
});

it("requires the admin role", async () => {
  const staff = await createAdmin({ email: "staff@example.com", role: "staff" });
  const res = await request(app).get("/api/v1/audit").set("Authorization", `Bearer ${tokenFor(staff)}`);
  expect(res.status).toBe(403);
});

it("lists entries newest first with adminId populated", async () => {
  const admin = await createAdmin();
  await AuditLog.create([
    { adminId: admin._id, action: "soft_delete", resource: "contact", resourceId: admin._id, timestamp: new Date(Date.now() - 1000) },
    { adminId: admin._id, action: "status_update", resource: "contact", resourceId: admin._id, timestamp: new Date() },
  ]);

  const res = await request(app).get("/api/v1/audit").set("Authorization", `Bearer ${tokenFor(admin)}`);

  expect(res.status).toBe(200);
  expect(res.body.data).toHaveLength(2);
  expect(res.body.data[0].action).toBe("status_update"); // newest first
  expect(res.body.data[0].adminId.email).toBe(admin.email);
});
