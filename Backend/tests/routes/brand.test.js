import request from "supertest";
import { connectTestDb, closeTestDb, clearTestDb } from "../setupDb.js";
import { createAdmin, tokenFor, TINY_JPEG_BUFFER } from "../helpers.js";

jest.mock("../../utils/notifyNewSubmission.js", () => ({
  notifyNewSubmission: jest.fn(),
}));
jest.mock("../../socket.js", () => ({
  initSocket: jest.fn(),
  emitNewLead: jest.fn(),
}));
jest.mock("../../utils/uploadImages.js", () => ({
  uploadImages: jest.fn(async (files) => files.map((_, i) => `https://cloudinary.example/fake-${i}.jpg`)),
}));

let app;
let BrandProject;
let uploadImages;

beforeAll(async () => {
  await connectTestDb();
  app = (await import("../../app.js")).default;
  BrandProject = (await import("../../models/BrandProject.js")).default;
  ({ uploadImages } = await import("../../utils/uploadImages.js"));
});

afterEach(async () => {
  await clearTestDb();
  jest.clearAllMocks();
});

afterAll(async () => {
  await closeTestDb();
});

describe("POST /api/v1/brand", () => {
  it("saves a submission with no images, calling uploadImages with an empty list", async () => {
    const res = await request(app)
      .post("/api/v1/brand")
      .field("fullName", "Jane Doe")
      .field("businessName", "Doe Co")
      .field("email", "jane@example.com")
      .field("brandType", "Startup Brand")
      .field("services", JSON.stringify(["Logo Design"]))
      .field("description", "A new brand");

    expect(res.status).toBe(201);
    const saved = await BrandProject.findOne({ email: "jane@example.com" });
    expect(saved.images).toEqual([]);
  });

  it("saves a submission with attached images, storing the URLs uploadImages returns (Cloudinary mocked)", async () => {
    const res = await request(app)
      .post("/api/v1/brand")
      .field("fullName", "Jane Doe")
      .field("businessName", "Doe Co")
      .field("email", "jane@example.com")
      .field("brandType", "Startup Brand")
      .field("services", JSON.stringify(["Logo Design"]))
      .field("description", "A new brand")
      .attach("images", TINY_JPEG_BUFFER, { filename: "ref.jpg", contentType: "image/jpeg" });

    expect(res.status).toBe(201);
    expect(uploadImages).toHaveBeenCalledTimes(1);

    const saved = await BrandProject.findOne({ email: "jane@example.com" });
    expect(saved.images).toEqual(["https://cloudinary.example/fake-0.jpg"]);
  });

  it("rejects a disguised (non-image) file before ever calling uploadImages", async () => {
    const res = await request(app)
      .post("/api/v1/brand")
      .field("fullName", "Jane Doe")
      .field("businessName", "Doe Co")
      .field("email", "jane@example.com")
      .field("brandType", "Startup Brand")
      .attach("images", Buffer.from("<html>not an image</html>"), {
        filename: "sneaky.jpg",
        contentType: "image/jpeg",
      });

    expect(res.status).toBe(400);
    expect(uploadImages).not.toHaveBeenCalled();
    expect(await BrandProject.countDocuments()).toBe(0);
  });

  it("rejects a submission missing required fields", async () => {
    const res = await request(app).post("/api/v1/brand").field("fullName", "Jane Doe");
    expect(res.status).toBe(400);
  });
});

describe("GET /api/v1/brand", () => {
  it("requires authentication", async () => {
    const res = await request(app).get("/api/v1/brand");
    expect(res.status).toBe(401);
  });

  it("lists brand requests for an authenticated admin", async () => {
    const admin = await createAdmin();
    const token = tokenFor(admin);
    await BrandProject.create({
      fullName: "Jane",
      businessName: "Doe Co",
      email: "jane@example.com",
      brandType: "Startup Brand",
    });

    const res = await request(app).get("/api/v1/brand").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(1);
  });
});

describe("DELETE /api/v1/brand/:id", () => {
  it("soft-deletes and requires the admin role", async () => {
    const staff = await createAdmin({ email: "staff@example.com", role: "staff" });
    const project = await BrandProject.create({
      fullName: "Jane",
      businessName: "Doe Co",
      email: "jane@example.com",
      brandType: "Startup Brand",
    });

    const forbidden = await request(app)
      .delete(`/api/v1/brand/${project._id}`)
      .set("Authorization", `Bearer ${tokenFor(staff)}`);
    expect(forbidden.status).toBe(403);

    const admin = await createAdmin({ email: "admin2@example.com", role: "admin" });
    const ok = await request(app)
      .delete(`/api/v1/brand/${project._id}`)
      .set("Authorization", `Bearer ${tokenFor(admin)}`);
    expect(ok.status).toBe(200);

    const stillThere = await BrandProject.findById(project._id);
    expect(stillThere.deletedAt).not.toBeNull();
  });
});
