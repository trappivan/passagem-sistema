import { Request, Response, NextFunction } from "express";

import { CustomError } from "../utils/CustomError";

export const errorHandler = (
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return res.status(err.httpStatusCode).json({
		statusCode: err.httpStatusCode,
		error: err.errorsValidation,
		errorType: err.errorType,
		errorMessage: err.message,
		errorRaw: err.errorRaw,
		stack: err.stack,
	});
};
