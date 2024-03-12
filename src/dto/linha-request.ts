import {
	IsArray,
	IsDate,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsString,
	Matches,
	Max,
	MaxLength,
} from "class-validator";

export class LinhaDTO {
	@IsNotEmpty()
	@IsInt()
	id: number;

	@IsNotEmpty()
	@IsString()
	companhia: string;

	@IsNotEmpty()
	@Matches(/^(?:[01]\d|2[0-3]):[0-5]\d\s*-\s*(?:[01]\d|2[0-3]):[0-5]\d$/, {
		message: "Horário deve estar no formato HH:MM - HH:MM",
	})
	horario: string;

	@IsNotEmpty()
	@MaxLength(50, { message: "Nome deve ter no máximo 50 caracteres" })
	embarque: string;

	@IsNotEmpty({ message: "Nome não pode ser vazio" })
	@MaxLength(50, { message: "Nome deve ter no máximo 50 caracteres" })
	desembarque: string;

	@IsNotEmpty({ message: "Nome não pode ser vazio" })
	@MaxLength(100, { message: "Nome deve ter no máximo 100 caracteres" })
	nome: string;

	@IsNotEmpty({ message: "Distância em km não pode ser vazia" })
	@IsNumber({ maxDecimalPlaces: 4, allowNaN: false })
	distancia_km: number;

	@IsNotEmpty({ message: "Id do ônibus não pode ser vazio" })
	@IsInt({ message: "Id do ônibus deve ser um número inteiro" })
	onibus_id: number;
}
