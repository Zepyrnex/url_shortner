const prisma = require("../prisma");

const createShortUrl = async (url, shortCode, expiresAt) => {
    return await prisma.url.create({
        data: {
            originalUrl: url,
            shortCode,
            expiresAt,
        },
    });
};

const findByShortCode = async (shortCode) => {
    return await prisma.url.findUnique({
        where: {
            shortCode,
        },
    });
};

const incrementClicks = async (shortCode) => {
    return await prisma.url.update({
        where: {
            shortCode,
        },
        data: {
            clicks: {
                increment: 1,
            },
        },
    });
};

const getUrlStats = async (shortCode) => {
    return await prisma.url.findUnique({
        where: {
            shortCode,
        },
    });
};

const deleteShortUrl = async (shortCode) => {
    return await prisma.url.delete({
        where: {
            shortCode,
        },
    });
};

module.exports = {
    createShortUrl,
    findByShortCode,
    incrementClicks,
    getUrlStats,
    deleteShortUrl,
};