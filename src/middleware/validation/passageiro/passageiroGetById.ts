import { NextFunction, Request, Response } from "express";
import { ErrorValidation } from "../../../utils/types";
import { PassageiroDTO } from "../../../dto/passageiro-request";
import { ValidationError, validate } from "class-validator";
import { CustomError } from "../../../utils/CustomError";

export const passageiroGetByIdValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	const errorsValidation: ValidationError[] = [];

	const passageiro: Partial<PassageiroDTO> = new PassageiroDTO();
	passageiro.id = Number(id);

	const validater = await validate(passageiro, {
		skipMissingProperties: true,
	}).then((errors) => {
		if (errors.length > 0) {
			errors.forEach((e) => {
				errorsValidation.push(e);
			});

			const customError = new CustomError(
				401,
				"Validation",
				"Erro de validação ao buscar passageiro",
				null,
				null,
				errorsValidation
			);

			return next(customError);
		}
	});
	console.log("validatervalidater", validater);
	return next();
};
