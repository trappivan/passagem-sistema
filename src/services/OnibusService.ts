import { on } from "events";
import { AppDataSource } from "../data-source";
import { Onibus } from "../entity/Onibus";
import PrecoServices from "./PrecoService";
import { QueryFailedError } from "typeorm";
import { CustomError } from "../utils/CustomError";

class OnibusService {
	async getOnibusById(id: number) {
		const onibus = await AppDataSource.getRepository(Onibus)
			.findOne({
				relations: ["linha_id"],
				where: { id: id },
			})
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

				return response;
			});
		return onibus;
	}

	async getAllBus() {
		const allBus = await AppDataSource.getRepository(Onibus).find({
			relations: {
				linha_id: true,
			},
		});

		return allBus;
	}

	async createOnibus(onibus: Partial<Onibus>) {
		const newBus = new Onibus();

		const precoBase = await PrecoServices.findPreco(onibus.companhia).then(
			(response) => {
				if (response === null) {
					const customError = new CustomError(
						404,
						"General",
						"Companhia não encontrado",
						null,
						null,
						null
					);
					throw customError;
				}
				return response;
			}
		);

		newBus.poltronas_valor = precoBase.poltrona_base;
		newBus.leitos_valor = precoBase.leito_base;
		newBus.semi_leitos_valor = precoBase.semi_leito_base;

		newBus.placa = onibus.placa;
		newBus.companhia = onibus.companhia;
		newBus.assentos_total = onibus.assentos_total;
		newBus.poltronas_disponiveis = onibus.poltronas_disponiveis;
		newBus.leitos_disponiveis = onibus.leitos_disponiveis;
		newBus.semi_leitos_disponiveis = onibus.semi_leitos_disponiveis;
		newBus.poltronas_total = onibus.poltronas_disponiveis.length;
		newBus.leitos_total = onibus.leitos_disponiveis.length;
		newBus.semi_leitos_total = onibus.semi_leitos_disponiveis.length;

		try {
			const saved = await AppDataSource.getRepository(Onibus).save(newBus);
			console.log("saved", saved);
			return saved;
		} catch (error) {
			if (error instanceof QueryFailedError) {
				const customError = new CustomError(
					401,
					"Validation",
					"Erro de validação ao cadastrar onibus",
					[error.driverError.detail],
					null,
					null
				);
				throw customError;
			}
		}
	}
}

const onibusService = new OnibusService();

export default onibusService;
