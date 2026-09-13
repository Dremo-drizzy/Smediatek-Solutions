import express from "express";
import request from "supertest";
import upload, { verifyImageContent } from "../../middleware/upload.js";
import errorHandler from "../../middleware/errorHandler.js";
import { TINY_JPEG_BUFFER } from "../helpers.js";

const buildApp = () => {
  const app = express();
  app.post("/upload", upload.array("images", 3), verifyImageContent, (req, res) => {
    res.status(200).json({ count: req.files.length });
  });
  app.use(errorHandler);
  return app;
};

describe("upload middleware", () => {
  it("accepts a real image whose declared mimetype matches its content", async () => {
    const res = await request(buildApp())
      .post("/upload")
      .attach("images", TINY_JPEG_BUFFER, { filename: "photo.jpg", contentType: "image/jpeg" });

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(1);
  });

  it("accepts up to 3 images", async () => {
    const res = await request(buildApp())
      .post("/upload")
      .attach("images", TINY_JPEG_BUFFER, { filename: "a.jpg", contentType: "image/jpeg" })
      .attach("images", TINY_JPEG_BUFFER, { filename: "b.jpg", contentType: "image/jpeg" })
      .attach("images", TINY_JPEG_BUFFER, { filename: "c.jpg", contentType: "image/jpeg" });

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(3);
  });

  it("rejects a 4th image with 400", async () => {
    const res = await request(buildApp())
      .post("/upload")
      .attach("images", TINY_JPEG_BUFFER, { filename: "a.jpg", contentType: "image/jpeg" })
      .attach("images", TINY_JPEG_BUFFER, { filename: "b.jpg", contentType: "image/jpeg" })
      .attach("images", TINY_JPEG_BUFFER, { filename: "c.jpg", contentType: "image/jpeg" })
      .attach("images", TINY_JPEG_BUFFER, { filename: "d.jpg", contentType: "image/jpeg" });

    expect(res.status).toBe(400);
  });

  it("rejects a file whose declared mimetype isn't in the allowlist", async () => {
    const res = await request(buildApp())
      .post("/upload")
      .attach("images", Buffer.from("hello world"), { filename: "notes.txt", contentType: "text/plain" });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/JPEG, PNG, WEBP, or GIF/);
  });

  // Regression test: multer's fileFilter only sees the client-declared
  // Content-Type, which costs nothing to spoof. verifyImageContent sniffs
  // the actual bytes and must catch this even though the declared mimetype
  // and file extension both claim it's a jpeg.
  it("rejects a disguised file (HTML content, declared as image/jpeg with a .jpg name)", async () => {
    const disguised = Buffer.from("<html><body>not actually an image</body></html>");

    const res = await request(buildApp())
      .post("/upload")
      .attach("images", disguised, { filename: "totally-a-photo.jpg", contentType: "image/jpeg" });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/not valid images/);
  });

  it("rejects a file over the 5MB size limit", async () => {
    const oversized = Buffer.concat([TINY_JPEG_BUFFER, Buffer.alloc(5 * 1024 * 1024)]);

    const res = await request(buildApp())
      .post("/upload")
      .attach("images", oversized, { filename: "big.jpg", contentType: "image/jpeg" });

    expect(res.status).toBe(400);
  });
});
