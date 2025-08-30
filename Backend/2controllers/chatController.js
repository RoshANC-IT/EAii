// backend/controllers/sendMessage.js

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const sendMessage = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing Gemini API Key" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const geminiReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.json({ content: geminiReply });
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);

    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || "Unknown error from Gemini API";

    res.status(status).json({
      error: "Failed to get response from Gemini",
      details: message,
    });
  }
};
