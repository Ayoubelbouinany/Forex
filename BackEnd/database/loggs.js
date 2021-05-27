const winston = require('winston')
require('winston-mongodb')
require('dotenv').config()

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        // new winston.transports.Console(),
        new winston.transports.File({
            filename: 'error.log', 
            level:'error',
            json:true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),
            new winston.transports.MongoDB({
             maxsize: 555555444,
             level:'info',
             json:true,
             maxFiles: 5,
             db: process.env.DATABASE,
             options: { useUnifiedTopology: true }
            }),
    ],
    
})




module.exports = logger
