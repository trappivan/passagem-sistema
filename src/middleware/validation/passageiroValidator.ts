import { NextFunction, Request, Response } from "express";
import validator from "validator";

import { ErrorValidation } from "../../utils/types";
import { CustomError } from "../../utils/CustomError";

export const passageiroValidator = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, telefone, data_nascimento, cpf } = req.body;

	const errors: ErrorValidation[] = [];

	if (!validator.isEmail(email)) {
		errors.push({ email: "Email não condiz com as especificacoes" });
	}

	if (validator.isEmpty(email)) {
		errors.push({ email: "Email não pode ser vazio" });
	}

	if (!validator.isMobilePhone(telefone, "pt-BR")) {
		errors.push({ telefone: "Telefone não condiz com as especificacoes" });
	}

	if (validator.isEmpty(telefone)) {
		errors.push({ telefone: "Telefone não pode ser vazio" });
	}
	console.log(data_nascimento);
	console.log(
		"É DATAA",
		!validator.isDate(data_nascimento, {
			format: "YYYY/MM/DD",
			strictMode: true,
			delimiters: ["/"],
		})
	);

	// USAR JOI PARA VALIDAR DATA
	if (
		!validator.isDate(data_nascimento, {
			format: "DD-MM-YYYY",
			strictMode: true,
			delimiters: ["-"],
		})
	) {
		console.log("entrouuu");
		errors.push({
			data_nascimento: "Data de nascimento não condiz com o campo",
		});
	}

	if (validator.isEmpty(data_nascimento)) {
		errors.push({ data_nascimento: "Data de nascimento não pode ser vazio" });
	}

	if (validator.isEmpty(cpf)) {
		errors.push({ cpf: "CPF não pode ser vazio" });
	}
	console.log(errors);
	if (errors.length !== 0) {
		const error = new CustomError(
			400,
			"General",
			"Erro de validação ao cadastrar passageiro",
			null,
			null,
			errors
		);

		return next(error);
	}

	return next();
};
