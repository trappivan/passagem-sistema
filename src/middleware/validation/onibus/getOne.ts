import { NextFunction, Request, Response } from "express";
import { PassagemDTO } from "../../../dto/passagem-request";
import { ValidationError, validate } from "class-validator";
import { ErrorValidation } from "../../../utils/types";
import { CustomError } from "../../../utils/CustomError";
import { OnibusDTO } from "../../../dto/onibus-request";

export const onibusGetOneValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	const errorsValidation: ValidationError[] = [];

	const validateOnibus = new OnibusDTO();

	validateOnibus.id = Number(id);

	await validate(validateOnibus, { skipMissingProperties: true }).then(
		(errors) => {
			if (errors.length > 0) {
				errors.forEach((e) => {
					errorsValidation.push(e);
				});
				const customError = new CustomError(
					401,
					"General",
					"Erro de validação ao procurar onibus",
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
