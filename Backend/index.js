import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import { GoogleGenerativeAI } from '@google/generative-ai';

import connectDB from './2utils/2db.js';
import userRoutes from './2routes/user.routes.js';
import jobRoutes from './2routes/job.route.js';
import companyRoutes from './2routes/company.route.js';
import applicantRoutes from './2routes/application.route.js';
import DsaRoute from './2routes/Dsa.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const _dirname = path.resolve();

const corsOptions = {
  origin: ["http://localhost:5173", "https://eaii.onrender.com"],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/user', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/applicants', applicantRoutes);
app.use("/api/content", DsaRoute);
app.use(express.static(path.join(_dirname, "Frontend", "dist")));

// Instantiate Gemini client once
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    // Get model instance for gemini-1.5-flash (or change to your preferred model)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content with the input message
    const result = await model.generateContent(message);

    // Get text from response
    const response = await result.response;
    const text = response.text();

    res.json({ content: text });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ content: 'Failed to get response from Gemini AI.' });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "Frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
