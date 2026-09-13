import request from "supertest";
import { connectTestDb, closeTestDb, clearTestDb } from "../setupDb.js";
import { createAdmin, tokenFor } from "../helpers.js";

jest.mock("../../utils/notifyNewSubmission.js", () => ({
  notifyNewSubmission: jest.fn(),
}));
jest.mock("../../socket.js", () => ({
  initSocket: jest.fn(),
  emitNewLead: jest.fn(),
}));

let app;
let Contact;
let notifyNewSubmission;
let emitNewLead;

beforeAll(async () => {
  await connectTestDb();
  app = (await import("../../app.js")).default;
  Contact = (await import("../../models/Contact.js")).default;
  ({ notifyNewSubmission } = await import("../../utils/notifyNewSubmission.js"));
  ({ emitNewLead } = await import("../../socket.js"));
});

afterEach(async () => {
  await clearTestDb();
  jest.clearAllMocks();
});

afterAll(async () => {
  await closeTestDb();
});

describe("POST /api/v1/contact", () => {
  it("saves a valid submission, notifies, and emits a new-lead event", async () => {
    const res = await request(app)
      .post("/api/v1/contact")
      .send({ name: "Jane Doe", email: "jane@example.com", message: "Hello there" });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);

    const saved = await Contact.findOne({ email: "jane@example.com" });
    expect(saved).not.toBeNull();
    expect(notifyNewSubmission).toHaveBeenCalledTimes(1);
    expect(emitNewLead).toHaveBeenCalledWith("contact", saved._id);
  });

  it("rejects an invalid submission with 400 and does not notify", async () => {
    const res = await request(app).post("/api/v1/contact").send({ name: "", email: "not-an-email", message: "" });

    expect(res.status).toBe(400);
    expect(notifyNewSubmission).not.toHaveBeenCalled();
    expect(await Contact.countDocuments()).toBe(0);
  });
});

describe("GET /api/v1/contact", () => {
  it("requires authentication", async () => {
    const res = await request(app).get("/api/v1/contact");
    expect(res.status).toBe(401);
  });

  it("lists, paginates, filters by status, and excludes soft-deleted by default", async () => {
    const admin = await createAdmin();
    const token = tokenFor(admin);

    await Contact.create([
      { name: "A", email: "a@example.com", message: "m1", status: "new" },
      { name: "B", email: "b@example.com", message: "m2", status: "read" },
      { name: "C", email: "c@example.com", message: "m3", status: "new", deletedAt: new Date() },
    ]);

    const all = await request(app).get("/api/v1/contact").set("Authorization", `Bearer ${token}`);
    expect(all.status).toBe(200);
    expect(all.body.total).toBe(2); // soft-deleted excluded
    expect(all.body.data).toHaveLength(2);

    const filtered = await request(app)
      .get("/api/v1/contact?status=read")
      .set("Authorization", `Bearer ${token}`);
    expect(filtered.body.total).toBe(1);
    expect(filtered.body.data[0].email).toBe("b@example.com");

    const includingDeleted = await request(app)
      .get("/api/v1/contact?includeDeleted=true")
      .set("Authorization", `Bearer ${token}`);
    expect(includingDeleted.body.total).toBe(3);

    const paged = await request(app)
      .get("/api/v1/contact?limit=1&page=2")
      .set("Authorization", `Bearer ${token}`);
    expect(paged.body.data).toHaveLength(1);
    expect(paged.body.pages).toBe(2);
  });
});

describe("PATCH /api/v1/contact/:id/status", () => {
  it("updates status when authenticated", async () => {
    const admin = await createAdmin();
    const token = tokenFor(admin);
    const contact = await Contact.create({ name: "A", email: "a@example.com", message: "m1" });

    const res = await request(app)
      .patch(`/api/v1/contact/${contact._id}/status`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "archived" });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("archived");
  });

  it("404s for an id that doesn't exist", async () => {
    const admin = await createAdmin();
    const token = tokenFor(admin);
    const fakeId = "aaaaaaaaaaaaaaaaaaaaaaaa";

    const res = await request(app)
      .patch(`/api/v1/contact/${fakeId}/status`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "archived" });

    expect(res.status).toBe(404);
  });

  it("rejects an invalid status value", async () => {
    const admin = await createAdmin();
    const token = tokenFor(admin);
    const contact = await Contact.create({ name: "A", email: "a@example.com", message: "m1" });

    const res = await request(app)
      .patch(`/api/v1/contact/${contact._id}/status`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "not-a-status" });

    expect(res.status).toBe(400);
  });
});

describe("DELETE /api/v1/contact/:id", () => {
  it("soft-deletes (sets deletedAt) rather than removing the document", async () => {
    const admin = await createAdmin();
    const token = tokenFor(admin);
    const contact = await Contact.create({ name: "A", email: "a@example.com", message: "m1" });

    const res = await request(app)
      .delete(`/api/v1/contact/${contact._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    const stillExists = await Contact.findById(contact._id);
    expect(stillExists).not.toBeNull();
    expect(stillExists.deletedAt).not.toBeNull();
  });

  it("requires the admin role, not just any authenticated staff", async () => {
    const staff = await createAdmin({ email: "staff@example.com", role: "staff" });
    const token = tokenFor(staff);
    const contact = await Contact.create({ name: "A", email: "a@example.com", message: "m1" });

    const res = await request(app)
      .delete(`/api/v1/contact/${contact._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);
  });
});
