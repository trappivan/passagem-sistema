import { NextFunction, Request, Response } from "express";
import { PassagemDTO } from "../../../dto/passagem-request";
import { ValidationError, validate } from "class-validator";
import { ErrorValidation } from "../../../utils/types";
import { CustomError } from "../../../utils/CustomError";
import { LinhaDTO } from "../../../dto/linha-request";

export const linhaCreateValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const {
		companhia,
		horario,
		embarque,
		desembarque,
		distancia_km,
		nome,
		onibus_id,
	}: Partial<LinhaDTO> = req.body;

	const errorsValidation: ValidationError[] = [];

	const validateLinha = new LinhaDTO();

	validateLinha.companhia = companhia;
	validateLinha.horario = horario;
	validateLinha.embarque = embarque;
	validateLinha.desembarque = desembarque;
	validateLinha.distancia_km = distancia_km;
	validateLinha.nome = nome;
	validateLinha.onibus_id = onibus_id;

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
