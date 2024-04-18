import {
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	Matches,
} from "class-validator";

export class PassagemDTO {
	@IsNotEmpty({ message: "Id do passageiro não pode ser vazio" })
	@IsInt({ message: "Id do passageiro deve ser um número inteiro" })
	passageiro_id: number;

	@IsNotEmpty({ message: "Id da linha não pode ser vazio" })
	@IsInt({ message: "Id da linha deve ser um número inteiro" })
	linha_id: number;

	@IsNotEmpty({ message: "Número do assento não pode ser vazio" })
	@IsInt({ message: "Número do assento deve ser um número inteiro" })
	numero_assento: number;

	@IsNotEmpty({ message: "Valor da passagem não pode ser vazio" })
	@IsNumber(
		{ allowNaN: false },
		{ message: "Valor da passagem deve ser um número" }
	)
	@IsPositive({ message: "Valor da passagem não deve ser um número negativo" })
	valor_passagem: number;

	@IsNotEmpty({ message: "Tipo de passagem não pode ser vazio" })
	@IsString({ message: "Tipo de passagem deve ser uma string" })
	@Matches(/(leito|semi_leito|poltrona)/, {
		message: "Tipo de passagem deve ser leito, semi_leito ou poltrona",
	})
	tipo_passagem: string;

	@IsNotEmpty({ message: "Token da sessão não pode ser vazio" })
	@IsString({ message: "Token da sessão deve ser uma string" })
	tokenSession: string;
}
