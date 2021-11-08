import 'reflect-metadata' // We need this in order to use @Decorators
import http from 'http'

import loader from 'loaders'
import keys from 'config/keys'
import Logger from 'loaders/logger'
import expressApplication from './app'
import { disconnectMongoDB } from 'loaders/mongoConnection'

const startServer = async () => {
	try {
		/**
		 * Loads everything
		 */
		await loader()

		/**
		 * Express Application
		 */
		const app = expressApplication()

		/**
		 * HTTP Server
		 */
		const server = http.createServer(app)

		server.listen(keys.PORT, () => {
			Logger.info(`
                #############################################
                🛡️  Server listening on port: ${keys.PORT} 🛡️
                #############################################
            `)
		})
	} catch (error) {
		Logger.error(error)
		process.exit(1)
	}
}

startServer()

process.on('SIGINT', async () => {
	await disconnectMongoDB()
	process.exit(0)
})
