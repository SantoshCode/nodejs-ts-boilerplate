import winston from 'winston'

import keys from 'config/keys'

const transports = []

if (keys.ENV === 'development') {
	transports.push(
		new winston.transports.Console({
			format: winston.format.combine(winston.format.cli(), winston.format.splat()),
		})
	)
} else {
	transports.push(new winston.transports.Console())
}

const LoggerInstance = winston.createLogger({
	level: keys.LOGS.WINSTON_LOG_LEVEL,
	levels: winston.config.npm.levels,
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json()
	),
	transports,
})

export type LoggerInstanceType = typeof LoggerInstance

export default LoggerInstance
