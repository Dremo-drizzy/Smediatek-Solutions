import request from "supertest";
import { connectTestDb, closeTestDb, clearTestDb } from "../setupDb.js";
import { createAdmin, tokenFor } from "../helpers.js";

let app;
let PortfolioItem;

beforeAll(async () => {
  await connectTestDb();
  app = (await import("../../app.js")).default;
  PortfolioItem = (await import("../../models/PortfolioItem.js")).default;
});

afterEach(async () => {
  await clearTestDb();
});

afterAll(async () => {
  await closeTestDb();
});

it("GET / is public and returns items sorted by order", async () => {
  await PortfolioItem.create([
    { title: "B", category: "cat", imageUrl: "/b.jpg", order: 2 },
    { title: "A", category: "cat", imageUrl: "/a.jpg", order: 1 },
  ]);

  const res = await request(app).get("/api/v1/portfolio");
  expect(res.status).toBe(200);
  expect(res.body.map((i) => i.title)).toEqual(["A", "B"]);
});

it("POST requires the admin role", async () => {
  const staff = await createAdmin({ email: "staff@example.com", role: "staff" });
  const res = await request(app)
    .post("/api/v1/portfolio")
    .set("Authorization", `Bearer ${tokenFor(staff)}`)
    .send({ title: "New", category: "cat", imageUrl: "/n.jpg" });

  expect(res.status).toBe(403);
});

it("POST creates an item for an admin", async () => {
  const admin = await createAdmin();
  const res = await request(app)
    .post("/api/v1/portfolio")
    .set("Authorization", `Bearer ${tokenFor(admin)}`)
    .send({ title: "New", category: "cat", imageUrl: "/n.jpg" });

  expect(res.status).toBe(201);
  expect(await PortfolioItem.countDocuments()).toBe(1);
});

it("POST rejects a missing required field", async () => {
  const admin = await createAdmin();
  const res = await request(app)
    .post("/api/v1/portfolio")
    .set("Authorization", `Bearer ${tokenFor(admin)}`)
    .send({ title: "New" });

  expect(res.status).toBe(400);
});

it("PATCH updates a subset of fields", async () => {
  const admin = await createAdmin();
  const item = await PortfolioItem.create({ title: "Old", category: "cat", imageUrl: "/o.jpg" });

  const res = await request(app)
    .patch(`/api/v1/portfolio/${item._id}`)
    .set("Authorization", `Bearer ${tokenFor(admin)}`)
    .send({ title: "Updated" });

  expect(res.status).toBe(200);
  expect(res.body.title).toBe("Updated");
  expect(res.body.imageUrl).toBe("/o.jpg");
});

it("DELETE removes the item permanently (not a soft delete)", async () => {
  const admin = await createAdmin();
  const item = await PortfolioItem.create({ title: "Old", category: "cat", imageUrl: "/o.jpg" });

  const res = await request(app)
    .delete(`/api/v1/portfolio/${item._id}`)
    .set("Authorization", `Bearer ${tokenFor(admin)}`);

  expect(res.status).toBe(200);
  expect(await PortfolioItem.findById(item._id)).toBeNull();
});

it("DELETE 404s for an unknown id", async () => {
  const admin = await createAdmin();
  const res = await request(app)
    .delete("/api/v1/portfolio/aaaaaaaaaaaaaaaaaaaaaaaa")
    .set("Authorization", `Bearer ${tokenFor(admin)}`);

  expect(res.status).toBe(404);
});
