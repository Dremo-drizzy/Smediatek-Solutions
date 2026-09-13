import { v2 as cloudinary } from "cloudinary";

let configured = false;

// Lazy config for the same reason as utils/mailer.js: server.js loads dotenv
// after its route imports are evaluated, so CLOUDINARY_* env vars aren't set
// yet when this module is first imported.
export const getCloudinary = () => {
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    configured = true;
  }
  return cloudinary;
};
