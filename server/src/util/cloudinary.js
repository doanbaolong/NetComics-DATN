const cloudinary = require("cloudinary").v2;

const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await cloudinary.uploader.upload(file, {
        upload_preset: "netcomics",
      });
      if (result) {
        console.log(result);
        resolve({
          url: result.secure_url,
          id: result.public_id,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const destroy = (public_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await cloudinary.uploader.destroy(public_id);
      resolve({
        result,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { uploads, destroy };
