const prisma = require("../prisma");
const generateCode = require("../utils/generateCode");

// POST /shorten
const shortenUrl = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                message: "URL is required",
            });
        }

        const shortCode = generateCode();

        const newUrl = await prisma.url.create({
            data: {
                originalUrl: url,
                shortCode,
            },
        });

        res.status(201).json({
            shortUrl: `http://localhost:3000/${newUrl.shortCode}`,
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

        const url = await prisma.url.findUnique({
            where: {
                shortCode,
            },
        });

        if (!url) {
            return res.status(404).json({
                message: "URL not found",
            });
        }

        await prisma.url.update({
            where: {
                shortCode,
            },
            data: {
                clicks: {
                    increment: 1,
                },
            },
        });

        return res.redirect(url.originalUrl);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    shortenUrl,
    redirectUrl,
};