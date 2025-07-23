import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const adapter = new JSONFile('db.json');
const db = new Low(adapter);
await db.read();
db.data ||= { keys: [] };

export default async (req, res) => {
  const { key } = req.query;
  if (!key) return res.status(400).json({ valid: false, error: "Key not provided" });

  const found = db.data.keys.find(k => k.key === key);
  if (!found) return res.status(404).json({ valid: false });

  // Optional: expire after 12 hours
  const expired = Date.now() - found.createdAt > 12 * 60 * 60 * 1000;
  if (expired) return res.status(410).json({ valid: false, expired: true });

  res.status(200).json({ valid: true });
};
