const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const mongoose = require('mongoose')
// required modules addded

// connecting to port
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



db.once("open", () => {
  app.listen(PORT, () => console.log(`on localhost:${PORT}`));
  });
