import { Request, Response, NextFunction } from "express";

import { CustomError } from "../utils/CustomError";

export const errorHandler = (
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return res.status(err.httpStatusCode).json({
		errorType: err.errorType,
		errorMessage: err.message,
		errors: err.errors,
		errorRaw: err.errorRaw,
		errorsValidation: err?.errorsValidation?.map((e, i) => {
			return Object.entries(e.constraints)
				.map((e, i) => {
					return e[1];
				})
				.join(", ");
		}),
		stack: err.stack,
	});
};
