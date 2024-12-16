//NotFound
const notFound = (req, res, next) => {
    const error = new Error('Not Found : ${req.originalUrl}');
    res.status(404);
    next(error);
};

//ErrorHandler
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    req.status(statusCode);
    res.json({
        message: err?.message,
        stack: err?.stack,
    });
};