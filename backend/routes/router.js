import express from "express";
import { add, del, get, update } from "../controllers/controller.js";
const router = express.Router();

router.post("/", add);
router.get("/", get);
router.put("/:id", update);
router.delete("/:id", del);

export default router;
