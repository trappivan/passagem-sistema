import { NextFunction, Request, Response } from "express";
// import { Usuario } from "../../../dto/passageiro-request";
import { ValidationError, validate } from "class-validator";
import { CustomError } from "../../../utils/CustomError";
import { Usuario } from "../../../entity/Usuario";
import { Passageiro } from "../../../entity/Passageiro";

export const passageiroGetByIdValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	const errorsValidation: ValidationError[] = [];

	const passageiro: Passageiro = new Passageiro();
	passageiro.id = Number(id);

	await validate(passageiro, {
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

	return next();
};
