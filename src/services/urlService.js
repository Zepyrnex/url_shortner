const prisma = require("../prisma");

const createShortUrl = async (originalUrl, shortCode) => {
    return prisma.url.create({
        data: {
            originalUrl,
            shortCode,
        },
    });
};

const findByShortCode = async (shortCode) => {
    return prisma.url.findUnique({
        where: {
            shortCode,
        },
    });
};

const incrementClicks = async (shortCode) => {
    return prisma.url.update({
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
    return prisma.url.findUnique({
        where: {
            shortCode,
        },
        select: {
            originalUrl: true,
            shortCode: true,
            clicks: true,
            createdAt: true,
        },
    });
};

const deleteShortUrl = async (shortCode) => {
    return prisma.url.delete({
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