import request from "supertest";
import { connectTestDb, closeTestDb, clearTestDb } from "../setupDb.js";
import { createAdmin, tokenFor } from "../helpers.js";

let app;
let Contact;

beforeAll(async () => {
  await connectTestDb();
  app = (await import("../../app.js")).default;
  Contact = (await import("../../models/Contact.js")).default;
});

afterEach(async () => {
  await clearTestDb();
});

afterAll(async () => {
  await closeTestDb();
});

it("requires authentication", async () => {
  const res = await request(app).get("/api/v1/stats/overview");
  expect(res.status).toBe(401);
});

it("returns months, monthly counts, and status breakdown per resource", async () => {
  const admin = await createAdmin();
  await Contact.create({ name: "A", email: "a@example.com", message: "m", status: "new" });
  await Contact.create({ name: "B", email: "b@example.com", message: "m", status: "read" });

  const res = await request(app).get("/api/v1/stats/overview").set("Authorization", `Bearer ${tokenFor(admin)}`);

  expect(res.status).toBe(200);
  expect(res.body.months).toHaveLength(12);
  expect(res.body.monthly.contact).toBeDefined();
  expect(res.body.statusBreakdown.contact).toEqual(
    expect.arrayContaining([
      { status: "new", count: 1 },
      { status: "read", count: 1 },
    ])
  );
});
