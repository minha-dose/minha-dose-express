import 'dotenv/config';
const express = require('express');
const app = express();
const port = process.env.port ?? 3000;
const eraseDatabaseOnSync = process.env.ERASE_DB === "true" ?? false;

app.get('/', (req, res) => {
  res.send("API ON!");
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});