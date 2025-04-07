import { v2 as cloudinary } from "cloudinary";
import "multer";

import env from "@/env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

type SingleFile = Express.Multer.File;
type MultipleFile = Express.Multer.File[];

function toDataUrl(file: SingleFile) {
  // eslint-disable-next-line node/prefer-global/buffer
  const b64 = Buffer.from(file.buffer).toString("base64");
  console.log("BASE64\n", b64);
  console.log("MIMETYPE\n", file.mimetype);
  const dataUrl = `data:${file.mimetype};base64,${b64}`;
  return dataUrl;
}

function getPublicIdFromFileUrl(fileUrl: string) {
  const fileNameUsingSubstring = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
  const publicId = fileNameUsingSubstring.substring(0, fileNameUsingSubstring.lastIndexOf("."));
  return publicId;
}

export default {
  async uploadSingleFile(file: SingleFile) {
    const fileDataUrl = toDataUrl(file);
    const result = await cloudinary.uploader.upload(fileDataUrl, {
      resource_type: "auto",
    });
    return result;
  },
  async uploadMultipleFile(files: MultipleFile) {
    const uploadBatch = files.map((file) => {
      const result = this.uploadSingleFile(file);
      return result;
    });
    const results = await Promise.all(uploadBatch);
    return results;
  },
  async removeFile(fileUrl: string) {
    const publicId = getPublicIdFromFileUrl(fileUrl);
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  },
};
