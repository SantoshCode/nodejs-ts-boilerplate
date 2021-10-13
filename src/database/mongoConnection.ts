import mongoose from 'mongoose'

mongoose.connection.once('connected', function (this: mongoose.Connection) {
	console.log(`MongoDB :: Connection successful HOST:${this.host} DB:${this.name} `)
	// setTimeout(() => {
	// 	// eslint-disable-next-line @typescript-eslint/no-var-requires
	// 	const seed = require('src/utils/dbSeeder')
	// 	seed()
	// }, 500)
})
mongoose.connection.once('open', function () {
	console.log('MongoDB :: Connection Ready')
})
mongoose.connection.on('error', (error) => {
	throw error
})
mongoose.connection.on('disconnecting', function (this: mongoose.Connection) {
	console.log(`MongoDB :: Disconnecting ${this.name}`)
})
mongoose.connection.on('disconnected', function (this: mongoose.Connection) {
	console.log(`MongoDB :: Disconnected ${this.name}`)
})

export const connectMongoDB = async (mongoURI: string | undefined): Promise<void> => {
	if (!mongoURI) {
		throw Error('mongoURI is required')
	}
	await mongoose.connect(mongoURI, {
		serverSelectionTimeoutMS: 5000,
	})
}

export const disconnectMongoDB = async (): Promise<void> => {
	await mongoose.connection.close()
}
