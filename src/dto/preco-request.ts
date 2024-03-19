import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PrecoDTO {
	@IsNotEmpty({ message: "Companhia não pode ser vazio" })
	@IsInt({ message: "Companhia deve ser um número" })
	companhia: number;

	@IsNotEmpty({ message: "Coeficiente gasolina não pode ser vazio" })
	@IsNumber(
		{ allowNaN: false, maxDecimalPlaces: 2 },
		{ message: "Coeficiente gasolina deve ser um número" }
	)
	coeficiente_gaso: number;

	@IsNotEmpty({ message: "Coeficiente pedágio  não pode ser vazio" })
	@IsNumber(
		{ allowNaN: false, maxDecimalPlaces: 2 },
		{ message: "Coeficiente pedágio deve ser um número" }
	)
	coeficiente_pedagio: number;

	@IsNotEmpty({ message: "Leito base não pode ser vazio" })
	@IsNumber(
		{ allowNaN: false, maxDecimalPlaces: 2 },
		{ message: "Leito base deve ser um número" }
	)
	leito_base: number;

	@IsNotEmpty({ message: "Semi leito base não pode ser vazio" })
	@IsNumber(
		{ allowNaN: false, maxDecimalPlaces: 2 },
		{ message: "Semi leito base deve ser um número" }
	)
	semi_leito_base: number;

	@IsNotEmpty({ message: "Poltrona base não pode ser vazio" })
	@IsNumber(
		{ allowNaN: false, maxDecimalPlaces: 2 },
		{ message: "Poltrona base deve ser um número" }
	)
	poltrona_base: number;
}
