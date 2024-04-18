import { NextFunction, Request, Response } from "express";
import { PassagemDTO } from "../../../dto/passagemDTO";
import { ValidationError, validate } from "class-validator";
import { ErrorValidation } from "../../../utils/types";
import { CustomError } from "../../../utils/CustomError";

export const passagemCreateValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const {
		passageiro_id,
		linha_id,
		numero_assento,
		valor_passagem,
		tipo_passagem,
	}: PassagemDTO = req.body;

	const errorsValidation: ValidationError[] = [];
	const validatePassagem = new PassagemDTO();

	validatePassagem.passageiro_id = passageiro_id;
	validatePassagem.linha_id = linha_id;
	validatePassagem.numero_assento = numero_assento;
	validatePassagem.valor_passagem = valor_passagem;
	validatePassagem.tipo_passagem = tipo_passagem;

	await validate(validatePassagem, { skipMissingProperties: true }).then(
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
			return next();
		}
	);
};
