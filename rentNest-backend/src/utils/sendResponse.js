export const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: true,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
        meta: data.meta,
    });
};
