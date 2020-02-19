import express from "express";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import contactsRoutes from "./routes/contacts";
import connectDb from "./config/db";

const app = express();

const PORT = process.env.PORT || 5000;

connectDb();
app.use(express.json({ extended: false }));
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the Contact-Keeper API" });
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
