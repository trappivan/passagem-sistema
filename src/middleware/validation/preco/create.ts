import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/CustomError";
import { ValidationError, validate } from "class-validator";
import { PrecoDTO } from "../../../dto/precoDTO";

export const precoCreateValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const {
		coeficiente_gaso,
		coeficiente_pedagio,
		companhia,
		leito_base,
		poltrona_base,
		semi_leito_base,
	}: Partial<PrecoDTO> = req.body;

	const errorsValidation: ValidationError[] = [];

	const validatePreco = new PrecoDTO();

	validatePreco.coeficiente_gaso = coeficiente_gaso;
	validatePreco.coeficiente_pedagio = coeficiente_pedagio;
	validatePreco.companhia = companhia;
	validatePreco.leito_base = leito_base;
	validatePreco.poltrona_base = poltrona_base;
	validatePreco.semi_leito_base = semi_leito_base;

	await validate(validatePreco, { skipMissingProperties: true }).then(
		(errors) => {
			if (errors.length > 0) {
				errors.forEach((e, i) => {
					errorsValidation.push(e);
				});

				const error = new CustomError(
					401,
					"General",
					"Erro de validação ao cadastrar preco",
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
