const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = "https://api.vikey.ai/v1/chat/completions";
const API_KEY = process.env.VIKEY_API_KEY;

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const response = await axios.post(
      API_URL,
      {
        model: "qwen3-235b-a22b",
        messages,
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "API request failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));