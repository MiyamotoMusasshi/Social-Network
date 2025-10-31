import path from "path";
import multer from "multer";

export const __dirname = path.resolve();
export const uploadFolder = path.join(__dirname, "img");

const storage = multer.diskStorage({
  destination: function (_req, file, cb) {
    return cb(null, uploadFolder);
  },
  filename: function (_req, file, cb) {
    let originFileName = file.originalname.split(".")[0];
    let filename =
      originFileName + "-" + Date.now() + path.extname(file.originalname);

    return cb(null, filename);
  },
});

export const upload = multer({ storage: storage });
