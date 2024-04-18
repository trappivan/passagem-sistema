import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/CustomError";
import { PassageiroDTO } from "../../../dto/passageiroDTO";
import { ValidationError, validate } from "class-validator";

export const passageiroCreateValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { nome, email, telefone, cpf }: Partial<PassageiroDTO> = req.body;

	const errorsValidation: ValidationError[] = [];
	console.log("aqui no validation");
	const validatePassageiro = new PassageiroDTO();

	validatePassageiro.nome = nome;
	validatePassageiro.email = email;
	validatePassageiro.telefone = telefone;
	validatePassageiro.cpf = cpf;

	await validate(validatePassageiro, { skipMissingProperties: true }).then(
		(errors) => {
			if (errors.length > 0) {
				errors.forEach((e, i) => {
					errorsValidation.push(e);
				});

				const error = new CustomError(
					401,
					"General",
					"Erro de validação ao cadastrar passageiro",
					null,
					null,
					errorsValidation
				);
				return next(error);
			}
			return next();
		}
	);
};
