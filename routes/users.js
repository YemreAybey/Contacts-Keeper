import express from "express";
import { signupController } from "../controllers/users";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ users: "All users here" });
});

router.post("/", signupController);

export default router;
