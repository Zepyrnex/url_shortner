const express = require("express");

const router = express.Router();

const {
    shortenUrl,
    redirectUrl,
    getStats,
    deleteUrl,
} = require("../controllers/urlController");

router.post("/shorten", shortenUrl);

router.get("/stats/:shortCode", getStats);

router.get("/:shortCode", redirectUrl);

router.delete("/delete/:shortCode", deleteUrl);

module.exports = router;