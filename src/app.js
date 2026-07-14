const express = require("express");
const urlRoutes = require("./routes/url");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        project: "URL Shortener API",
        version: "1.0.0",
        status: "Running 🚀",
        endpoints: {
            shorten: "POST /shorten",
            redirect: "GET /:shortCode",
            stats: "GET /stats/:shortCode",
            delete: "DELETE /delete/:shortCode"
        }
    });
});

app.use("/", urlRoutes);

module.exports = app;