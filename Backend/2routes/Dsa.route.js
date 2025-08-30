import express from "express";
import isAuthenticated from "../2middlewares/isAuthenticated.js";
import  {DsaController, getAllDSA}  from "../2controllers/Dsa.controller.js";
const router = express.Router();
router.route("/writeContent").post(isAuthenticated, DsaController);
router.route("/readContent").get(getAllDSA);
export default router;
