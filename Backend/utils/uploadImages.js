import { getCloudinary } from "../config/cloudinary.js";

const uploadBuffer = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = getCloudinary().uploader.upload_stream(
      { folder: "smediatek/brand-projects" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });

export const uploadImages = (files = []) => Promise.all(files.map((file) => uploadBuffer(file.buffer)));
