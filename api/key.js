// File: api/key.js
export default function handler(req, res) {
  const key = req.query.key;
  const userid = req.query.userid;

  const VALID_KEYS = ["WALVY123", "WALVY456"];
  const WHITELIST = ["123456789"]; // userId khusus yang langsung valid

  if (WHITELIST.includes(userid)) return res.status(200).send("VALID");
  if (VALID_KEYS.includes(key)) return res.status(200).send("VALID");

  res.status(200).send("INVALID");
}
