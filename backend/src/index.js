import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', (req, res) => {
  const { prompt } = req.body;
  
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  const words = prompt ? `Echo: ${prompt}` : 'Hello from AI!';
  let i = 0;
  
  const interval = setInterval(() => {
    if (i >= words.length || res.writableEnded) {
      clearInterval(interval);
      res.end();
      return;
    }
    res.write(words[i]);
    i++;
  }, 50);

  req.on('close', () => {
    clearInterval(interval);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
