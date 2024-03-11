import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/CustomError";
import { PassageiroDTO } from "../../../dto/passageiro-request";
import { ValidationError, validate } from "class-validator";

export const passageiroCreateValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { nome, email, telefone, data_nascimento, cpf } = req.body;

	const errorsValidation: ValidationError[] = [];

	const validatePassageiro = new PassageiroDTO();

	validatePassageiro.nome = nome;
	validatePassageiro.email = email;
	validatePassageiro.telefone = telefone;
	validatePassageiro.data_nascimento = data_nascimento;
	validatePassageiro.cpf = cpf;

	await validate(validatePassageiro, { skipMissingProperties: true }).then(
		(errors) => {
			if (errors.length > 0) {
				errors.forEach((e, i) => {
					errorsValidation.push(e);
				});
				console.log(typeof errorsValidation);
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
