const { OpenAI } = require('openai');
const db = require('../config/db');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY
});

exports.askAI = async (req, res) => {
  const { question } = req.body;
  const user_id = req.user.id;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an expert academic tutor. Explain concepts clearly and simply. Do not solve full exams, but help with specific doubts." },
        { role: "user", content: question }
      ]
    });

    const aiResponse = response.choices[0].message.content;

    // Save history (optional but requested in data model)
    await db.query(
      'INSERT INTO chatbot_queries (user_id, question, response) VALUES ($1, $2, $3)',
      [user_id, question, aiResponse]
    );

    res.json({ answer: aiResponse });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
