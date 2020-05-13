require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(`${__dirname}/../react/dist/`));
app.use(bodyParser.urlencoded({extended: true}));
app.search(bodyParser.json());

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});