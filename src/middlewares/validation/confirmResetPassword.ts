import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import ErrorResponse from '../../utils/errorResponse'

const validateConfirmResetPasswordEndpointBody = (req: Request, _res: Response, next: NextFunction) => {
	// Create schema object
	const schema = Joi.object({
		passwordResetToken: Joi.string().required().messages({
			'string.empty': 'Password Reset Token should not be empty',
			'any.required': 'Password Reset Token is required',
		}),
	})

	// Schema options
	const options = {
		abortEarly: false, // include all errors
		stripUnknown: true, // remove unknown props
	}

	// Validate request body against schema
	const { error, value } = schema.validate(req.body, options)

	// on fail transfer error messages to error Handler
	if (error) {
		const messages = error.details.map((detail) => detail.message)
		return next(new ErrorResponse(messages, 401))
	}

	// on success replace req.body with validated value and trigger next middleware function
	req.body = { ...req.body, ...value }
	return next()
}

export default validateConfirmResetPasswordEndpointBody
