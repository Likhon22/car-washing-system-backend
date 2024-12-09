import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";
import config from "../config";
export const sendImageToCloudinary = async (
  path: string,
  imageName: string,
) => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });

  // Upload an image
  try {
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    });

    // deleting the temporary image file
    fs.unlink(path, err => {
      if (err) {
        console.error(err);
      } else {
        console.log(path);

        console.log("File removed");
      }
    });
    return uploadResult;
  } catch (error) {
    console.log(error);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
