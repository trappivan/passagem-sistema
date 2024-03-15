import {
	IsArray,
	IsInt,
	IsNotEmpty,
	IsString,
	Length,
	Matches,
} from "class-validator";

export class CompanhiaDTO {
	@IsNotEmpty({ message: "ID é obrigatório" })
	@IsInt({ message: "ID deve ser um número inteiro" })
	id: number;

	@IsNotEmpty({ message: "ID da companhia é obrigatório" })
	@IsInt({ message: "ID da companhia deve ser um número inteiro" })
	companhia_id: number;

	@IsNotEmpty({ message: "CNPJ é obrigatório" })
	@IsString({ message: "CNPJ deve ser uma string" })
	@Length(18, 18, { message: "CNPJ deve ter 18 caracteres" })
	@Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, { message: "CNPJ inválido" })
	cnpj: string;

	@IsNotEmpty({ message: "Endereço é obrigatório" })
	@IsString({ message: "Endereço deve ser uma string" })
	endereco: string;

	@IsNotEmpty({ message: "Nome é obrigatório" })
	@IsString({ message: "Nome deve ser uma string" })
	nome: string;

	@IsNotEmpty({ message: "Região é obrigatória" })
	@IsArray({ message: "Região deve ser um array de strings" })
	regiao: string[];
}
