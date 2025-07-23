import { nanoid } from 'nanoid';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const adapter = new JSONFile('db.json');
const db = new Low(adapter);
await db.read();
db.data ||= { keys: [] };

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const key = `WALVY-${nanoid(8).toUpperCase()}`;
  const timestamp = Date.now();

  db.data.keys.push({ key, createdAt: timestamp });
  await db.write();

  res.status(200).json({ success: true, key });
};