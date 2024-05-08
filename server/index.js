import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userModels } from "./models/user.model.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["https://test-form-frontend.vercel.app"],
    methods: ["POST", "GET"],
  })
);
dotenv.config();
app.get("/", (req, res) => {
  res.send("On /");
});

mongoose.connect(
  "mongodb+srv://pratham:Pratham123@cluster0.rkqttza.mongodb.net/test-form?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("https://test-form-api.vercel.app", async (req, res) => {
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
  console.log("listening");
});
