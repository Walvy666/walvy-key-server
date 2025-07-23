import express from 'express';
import generateKey from './routes/generate.js';
import checkKey from './routes/check.js';

const app = express();
app.use(express.json());

app.post('/api/generate-key', generateKey);
app.get('/api/check-key', checkKey);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
