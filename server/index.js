import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userModels } from "./models/user.model.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://test-form-frontend.vercel.app",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
dotenv.config();

app.get("/", (req, res) => {
  res.send("On /");
});

mongoose.connect(
  "mongodb+srv://pratham:pratham123@cluster0/test-form?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
 
  const { name, email, username, phone, gender, dob, address, skills } =
    req.body;
  try {
    const userInfo = await userModels.create({
      name,
      email,
      username,
      phone,
      gender,
      dob,
      address,
      skills,
    });
    res.json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
