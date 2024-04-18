import { NextFunction, Request, Response } from "express";
import { ValidationError, validate } from "class-validator";
import { CustomError } from "../../../utils/CustomError";
import { CompanhiaDTO } from "../../../dto/companhiaDTO";

export const companhiaGetOneValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	const errorsValidation: ValidationError[] = [];

	const validateLinha = new CompanhiaDTO();

	validateLinha.id = Number(id);

	await validate(validateLinha, { skipMissingProperties: true }).then(
		(errors) => {
			if (errors.length > 0) {
				errors.forEach((e) => {
					errorsValidation.push(e);
				});
				const customError = new CustomError(
					401,
					"General",
					"Erro de validação ao buscar companhia",
					null,
					null,
					errorsValidation
				);
				return next(customError);
			}
		}
	);

	return next();
};
