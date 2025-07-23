import fs from 'fs';

export default function handler(req, res) {
  const { key } = req.query;
  if (!key) return res.status(400).json({ valid: false });

  const keys = JSON.parse(fs.readFileSync('keys.json'));
  const found = keys.find(k => k.key === key);

  res.status(200).json({ valid: !!found });
}
