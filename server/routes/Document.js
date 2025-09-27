import express from "express";
import upload from "../multer.js";
import { uploadFiles, getDocuments } from "../controllers/Document.js";
import { verifyToken } from "../middleware/Auth.js";

const router = express.Router();

router.post("/", verifyToken, upload.array("documents", 5), uploadFiles);
router.get("/", verifyToken, getDocuments);

export default router;