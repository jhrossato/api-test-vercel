const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const produtoRouter = require('./routes/produto');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/produtos', produtoRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, "0.0.0.0", function () {
  console.log(`Berlocaria API escutando na porta ${process.env.PORT}!`);
});



