import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const newKey = `WALVY-${uuidv4().split('-')[0].toUpperCase()}`;
  const keys = JSON.parse(fs.readFileSync('keys.json'));
  keys.push({ key: newKey, created: Date.now() });
  fs.writeFileSync('keys.json', JSON.stringify(keys, null, 2));

  res.status(200).json({ key: newKey });
}
