import { IsInt, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class OnibusDTO {
	@IsNotEmpty({ message: "Id não pode ser vazio" })
	@IsInt({ message: "Id deve ser um número inteiro" })
	id: number;

	@IsNotEmpty({ message: "Placa não pode ser vazio" })
	@IsString({ message: "Placa deve ser uma string" })
	@Length(7, 7, { message: "Placa deve ter 7 caracteres" })
	placa: string;

	@IsNotEmpty({ message: "Companhia não pode ser vazio" })
	@IsString({ message: "Comphanhia deve ser uma string" })
	companhia: string;

	@IsNotEmpty({ message: "Assentos total não pode ser vazio" })
	@IsInt({ message: "Assentos total deve ser um número inteiro" })
	assentos_total: number;

	@IsNotEmpty({ message: "Poltronas disponíveis não pode ser vazio" })
	@IsInt({
		each: true,
		message: "Poltronas disponíveis deve ser um número inteiro",
	})
	poltronas_disponiveis: number[];

	@IsNotEmpty({ message: "Leitos disponíveis não pode ser vazio" })
	@IsInt({
		each: true,
		message: "Leitos disponíveis deve ser um número inteiro",
	})
	leitos_disponiveis: number[];

	@IsNotEmpty({ message: "Semileitos disponíveis não pode ser vazio" })
	@IsInt({
		each: true,
		message: "Semileitos disponíveis deve ser um número inteiro",
	})
	semi_leitos_disponiveis: number[];
}
