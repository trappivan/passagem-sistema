import { QueryFailedError } from "typeorm";
import { AppDataSource } from "../data-source";
import { LinhaDTO } from "../dto/linha-request";
import { Linha } from "../entity/Linha";
import { CustomError } from "../utils/CustomError";
import onibusService from "./OnibusService";

class LinhaService {
	async createLinhas(linha: Partial<LinhaDTO>) {
		const onibus = await onibusService
			.getOnibusById(linha.onibus_id)
			.then((response) => {
				if (response === null) {
					throw new CustomError(
						404,
						"General",
						"Onibus não encontrado",
						null,
						null,
						null
					);
				}

				if (response.linha_id !== null) {
					throw new CustomError(
						401,
						"Unauthorized",
						"Onibus já possui linha",
						null,
						null,
						null
					);
				}

				return response;
			});

		const newLinha = new Linha();

		newLinha.companhia = linha.companhia;
		newLinha.horario = linha.horario;
		newLinha.embarque = linha.embarque;
		newLinha.desembarque = linha.desembarque;
		newLinha.nome = linha.nome;
		newLinha.distancia_km = linha.distancia_km;
		newLinha.onibus_id = onibus;

		let saved: Linha;
		try {
			saved = await AppDataSource.getRepository(Linha).save(newLinha);
		} catch (error) {
			console.log(error);
			if (error instanceof QueryFailedError) {
				throw new CustomError(
					500,
					"General",
					"Erro ao salvar linha",
					[error.message],
					null,
					null
				);
			}
		}
		return saved;
	}

	async getLinhaById(id: number) {
		const linha = await AppDataSource.getRepository(Linha).findOne({
			where: { id: id },
		});
		return linha;
	}

	async getLinhas() {
		const linhas = await AppDataSource.getRepository(Linha).find({
			relations: {
				onibus_id: true,
				passagem: true,
			},
		});
		return linhas;
	}
}

const LinhaServices = new LinhaService();

export default LinhaServices;
