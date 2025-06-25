import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/tasks",taskRoutes);
app.get("/",(req,res)=>{
    res.send('API is running...');
});

mongoose.connect(process.env.MONGO_URI,).then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch(err => {
  console.error("MongoDB connection failed:", err.message);
});
