const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API route to handle user chat messages
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    // Automated systemic response simulation (Can be easily swapped with live OpenAI/Gemini SDKs)
    let aiResponse = `I received your message: "${message}". As an AI assistant, I am fully configured to process your data request strings!`;

    // Simple custom rules to make the bot feel alive
    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      aiResponse = "Hello! 👋 I am your custom AI Assistant. How can I help you build software today?";
    } else if (message.toLowerCase().includes('help')) {
      aiResponse = "I can assist you with code structural layouts, debugging algorithms, or architecture tips!";
    }

    res.status(200).json({ reply: aiResponse });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error processing message array tokens' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AI Server execution environment running on port ${PORT}`);
});
