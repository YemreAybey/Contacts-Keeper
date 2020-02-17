import express from "express";
import { getUser, loginUser } from "../controllers/auth";

const router = express.Router();

router.get("/", getUser);

router.post("/", loginUser);

export default router;
