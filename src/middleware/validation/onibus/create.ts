import { NextFunction, Request, Response } from "express";
import { ValidationError, validate } from "class-validator";
import { CustomError } from "../../../utils/CustomError";
import { OnibusDTO } from "../../../dto/onibusDTO";

export const onibusCreateValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const {
		assentos_total,
		companhia,
		placa,
		leitos_disponiveis,
		poltronas_disponiveis,
		semi_leitos_disponiveis,
	}: Partial<OnibusDTO> = req.body;

	const errorsValidation: ValidationError[] = [];
	const validateOnibus = new OnibusDTO();

	validateOnibus.assentos_total = assentos_total;
	validateOnibus.companhia = companhia;
	validateOnibus.placa = placa;
	validateOnibus.leitos_disponiveis = leitos_disponiveis;
	validateOnibus.poltronas_disponiveis = poltronas_disponiveis;
	validateOnibus.semi_leitos_disponiveis = semi_leitos_disponiveis;

	await validate(validateOnibus, { skipMissingProperties: true }).then(
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
