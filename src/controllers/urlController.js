const generateCode = require("../utils/generateCode");

const {
    createShortUrl,
    findByShortCode,
    incrementClicks,
    getUrlStats,
    deleteShortUrl,
} = require("../services/urlService");

// POST /shorten
const shortenUrl = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                message: "URL is required",
            });
        }
        try {
            new URL(url);
        } catch {
            return res.status(400).json({
                message: "Invalid URL",
            });
        }
        let shortCode;
        let exists = true;

        while (exists) {
            shortCode = generateCode();

            const existing = await findByShortCode(shortCode);

            exists = !!existing;
        }

        const newUrl = await createShortUrl(url, shortCode);

        res.status(201).json({
            success: true,
            message: "Short URL created successfully",
            data: {
                originalUrl: newUrl.originalUrl,
                shortCode: newUrl.shortCode,
                shortUrl: `${process.env.BASE_URL || "http://localhost:3000"}/${newUrl.shortCode}`,
            },
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// GET /:shortCode
const redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await findByShortCode(shortCode);

        if (!url) {
            return res.status(404).json({
                message: "URL not found",
            });
        }

        await incrementClicks(shortCode);

        return res.redirect(url.originalUrl);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

const getStats = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await getUrlStats(shortCode);

        if (!url) {
            return res.status(404).json({
                message: "URL not found",
            });
        }

        return res.json(url);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

const deleteUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        await deleteShortUrl(shortCode);

        return res.json({
            message: "URL deleted successfully",
        });

    } catch (err) {
        console.error(err);

        return res.status(404).json({
            message: "URL not found",
        });
    }
};
module.exports = {
    shortenUrl,
    redirectUrl,
    getStats,
    deleteUrl,
};