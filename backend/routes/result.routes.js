import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getAllResultsForUser,
  getResultById,
} from "../controllers/result.controller.js";

const router = express.Router();

router.get("/", protect, getAllResultsForUser);
router.get("/:id", protect, getResultById);

export default router;
