const express = require("express");
const path = require("path");

const urlRoutes = require("./routes/url");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

// API routes
app.use("/", urlRoutes);

module.exports = app;