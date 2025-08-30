import express from "express";
import { singleUpload } from "../2middlewares/multer.js";
import { updateProfile } from "../2controllers/user.controller.js";
import isAuthenticated from "../2middlewares/isAuthenticated.js";
const router = express.Router();
router.post("/update-profile", isAuthenticated, singleUpload, updateProfile);
export default router;
