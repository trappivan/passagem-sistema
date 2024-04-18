import { NextFunction, Request, Response } from "express";
import { PassagemDTO } from "../../../dto/passagemDTO";
import { ValidationError, validate } from "class-validator";
import { ErrorValidation } from "../../../utils/types";
import { CustomError } from "../../../utils/CustomError";
import { LinhaDTO } from "../../../dto/linhaDTO";
import { Companhia } from "../../../entity/Companhia";
import { CompanhiaDTO } from "../../../dto/companhiaDTO";

export const companhiaCreateValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { cnpj, endereco, nome, regiao }: Partial<CompanhiaDTO> = req.body;

	const errorsValidation: ValidationError[] = [];

	const validateCompanhia = new CompanhiaDTO();

	validateCompanhia.cnpj = cnpj;
	validateCompanhia.endereco = endereco;
	validateCompanhia.nome = nome;
	validateCompanhia.regiao = regiao;

	await validate(validateCompanhia, { skipMissingProperties: true }).then(
		(errors) => {
			if (errors.length > 0) {
				errors.forEach((e) => {
					errorsValidation.push(e);
				});
				const customError = new CustomError(
					401,
					"General",
					"Erro de validação ao cadastrar companhia",
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
