const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../models/users");
const cloudinary = require("cloudinary").v2;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}
router.post("/upload/:id", upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { img: cldRes.secure_url } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});
module.exports = router;
