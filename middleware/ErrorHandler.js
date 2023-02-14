module.exports = {
    errorHandler(err, req, res, next) {
        // console.error(err.message);
        // console.error(err.stack);

        let statusCode = 500;
        if (err.status) {
            statusCode = err.status;
        }
        
        res.status(statusCode);
        
        return res.json({
            statusCode: err.status,
            statusText: err.message,
            message: err.message || 'Internal Server Error',
        });
    }
}