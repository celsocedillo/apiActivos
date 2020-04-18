const {createLogger, format, transports} = require('winston');

module.exports = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
        format.printf(info => `[${info.timestamp}] | ${info.level} | ${info.message}`)
    ),
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 10,
            filename: `${__dirname}/../logs/logapi.log`
        })
    ]

});

