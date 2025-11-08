import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Validate Cloudinary credentials
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.warn("⚠️  WARNING: Cloudinary credentials are not properly configured!");
  console.warn("Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export const uploadToCloudinary = async (
  buffer: Buffer,
  options = {}
): Promise<CloudinaryUploadResult> => {
  // Check if Cloudinary is configured
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary is not configured. Please set environment variables.");
  }

  // Validate buffer
  if (!buffer || buffer.length === 0) {
    throw new Error("Invalid image buffer: Buffer is empty or undefined");
  }

  return new Promise((resolve, reject) => {
    const uploadOptions = {
      resource_type: "auto" as const,
      folder: "ave-catering/products", // Organize images in folders
      ...options,
    };

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) {
          console.error("Cloudinary upload stream error:", error);
          reject(new Error(`Cloudinary upload failed: ${error.message}`));
        } else if (!result) {
          reject(new Error("Cloudinary upload returned no result"));
        } else {
          resolve(result as CloudinaryUploadResult);
        }
      })
      .end(buffer);
  });
};

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw error;
  }
};

export default cloudinary;
