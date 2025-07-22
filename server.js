
// server.js - Sistem Key Walvy
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

let keys = JSON.parse(fs.readFileSync('keys.json'));

app.get('/', (req, res) => {
  res.send('Walvy Key System Aktif!');
});

app.get('/check', (req, res) => {
  const key = req.query.key;
  if (keys.includes(key)) {
    res.send('VALID');
  } else {
    res.send('INVALID');
  }
});

app.get('/script', (req, res) => {
  const key = req.query.key;
  if (keys.includes(key)) {
    const script = fs.readFileSync('main.lua', 'utf8');
    res.type('text/plain').send(script);
  } else {
    res.status(403).send('Key Tidak Valid');
  }
});

app.listen(PORT, () => console.log(`Server aktif di http://localhost:${PORT}`));
