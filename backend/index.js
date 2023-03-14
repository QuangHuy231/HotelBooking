import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { login, logout, profile, register } from "./controller/auth.js";
import imageDownloader from "image-downloader";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import fs from "fs";

import {
  addNewPlace,
  deletePlace,
  getPlace,
  getPlaces,
  getPlacesInHome,
  updatePlace,
} from "./controller/place.js";

dotenv.config();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
mongoose.set("strictQuery", true);
await mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Sucessfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(dirname(__filename) + "/uploads"));

app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);
app.get("/profile", profile);

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({
  dest: "uploads",
});

app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;

    fs.renameSync(path, newPath);

    uploadFiles.push(newPath.replace("uploads\\", ""));
  }

  res.json(uploadFiles);
});

app.post("/addplaces", addNewPlace);
app.get("/user-places", getPlaces);
app.put("/places", updatePlace);
app.delete("/deleteplace/:id", deletePlace);
app.get("/places", getPlacesInHome);
app.get("/place/:id", getPlace);

app.listen(5000, () => {
  console.log("server start");
});
