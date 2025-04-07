import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

export default {
  upload: (fieldName: string, type = "single") => {
    if (type === "single") {
      return upload.single(fieldName);
    }
    else {
      return upload.array(fieldName);
    }
  },
};
