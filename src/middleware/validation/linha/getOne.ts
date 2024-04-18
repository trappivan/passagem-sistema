import { NextFunction, Request, Response } from "express";
import { PassagemDTO } from "../../../dto/passagemDTO";
import { ValidationError, validate } from "class-validator";
import { ErrorValidation } from "../../../utils/types";
import { CustomError } from "../../../utils/CustomError";
import { LinhaDTO } from "../../../dto/linhaDTO";

export const linhaGetOneValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	const errorsValidation: ValidationError[] = [];

	const validateLinha = new LinhaDTO();

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
					"Erro de validação ao cadastrar passagem",
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
