const express = require('express');
const path = require('path');
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();
const PORT = 3000;

// Inizializza OpenRouter come OpenAI compatibile
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1'
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct',  // modello gratuito consigliato
      messages: [
        { role: 'system', content: 'Sei un assistente intelligente e gentile che parla perfettamente la lingua italiana.' },
        { role: 'user', content: message }
      ]
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('Errore nella chiamata API:', error.message);
    res.status(500).json({ error: 'Errore nella chiamata API' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server attivo su http://localhost:${PORT}`);
});
