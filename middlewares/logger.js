const requestMonitor = (req, res, next) => {
    const startTimer = Date.now();
    const currentTime = new Date().toLocaleTimeString();

    
    res.on('finish', () => {
        const timeTaken = Date.now() - startTimer;
        const statusCode = res.statusCode;
        
        let type = 'LOG';
        if (statusCode >= 400) type = 'ALERT';

        console.log(`[${type}] ${currentTime} -> ${req.method} request to ${req.originalUrl} | Responded with ${statusCode} in ${timeTaken}ms`);
    });

    next();
};

module.exports = requestMonitor;