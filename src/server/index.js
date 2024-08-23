const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const dotenv = require('dotenv');
const { analyzeURL } = require('./analyzeURL');
app.use(express.static('dist'));
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 3000;

const MEAN_CLOUD_API_KEY = process.env.API_KEY;

app.get('/', function (req, res) {
  res.render('index.html');
});

app.post('/', async (req, res) => {
  // 1. Get the URL from the request
  const url = req.body.URI;
  // 2. Send the URL to the API
  const AnalyzeURL = await analyzeURL(url, MEAN_CLOUD_API_KEY);
  const { code, msg, sample } = AnalyzeURL;
  // 3. Send the response to the client
  if (code == 212) {
    return res.send({ msg: msg, code: code });
  } else if (code == 100) {
    return res.send({ msg: msg, code: code });
  }

  return res.send({ sample: sample, code: code });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
