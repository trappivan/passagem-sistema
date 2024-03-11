import {
	IsDate,
	IsDateString,
	IsEmail,
	IsInt,
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
	Matches,
	MinLength,
	isNotEmpty,
	isString,
	min,
} from "class-validator";

export class PassageiroDTO {
	@IsNotEmpty({ message: "Id não pode ser vazio" })
	@IsInt({ message: "Id deve ser um número inteiro" })
	id: number;

	@IsNotEmpty({ message: "Nome não pode ser vazio" })
	@IsString({ message: "Nome deve ser uma string" })
	@MinLength(3, { message: "Nome deve ter no mínimo 3 caracteres" })
	nome: string;

	@IsNotEmpty({ message: "CPF não pode ser vazio" })
	@IsString({ message: "CPF deve ser uma string" })
	@Matches(/^\d{3}.\d{3}.\d{3}-\d{2}$/, {
		message: "CPF deve ser um CPF válido",
	})
	cpf: string;

	@IsNotEmpty({ message: "Email não pode ser vazio" })
	@IsString({ message: "CPF deve ser uma string" })
	@IsEmail()
	email: string;

	@IsNotEmpty({ message: "Telefone não pode ser vazio" })
	@IsString({ message: "Telefone deve ser uma string" })
	@IsPhoneNumber("BR", {
		message: "Telefone deve ser um número de telefone válido",
	})
	telefone: string;

	@IsNotEmpty({ message: "Data de nascimento não pode ser vazio" })
	@IsString({ message: "Data de nascimento deve ser uma string" })
	@IsDateString({ strict: true })
	data_nascimento: string;
}
