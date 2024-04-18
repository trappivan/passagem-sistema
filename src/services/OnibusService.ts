import { on } from "events";
import dataSource from "../data-source";
import { Onibus } from "../entity/Onibus";
import PrecoServices from "./PrecoService";
import { QueryFailedError } from "typeorm";
import { CustomError } from "../utils/CustomError";
import companhiaServices from "./CompanhiaService";
import { OnibusDTO } from "../dto/onibusDTO";

class OnibusService {
	async getOnibusById(id: number) {
		const onibus = await dataSource.AppDataSource.getRepository(Onibus)
			.findOne({
				relations: ["linha_id", "companhia_id"],
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
		const allBus = await dataSource.AppDataSource.getRepository(Onibus).find({
			relations: {
				linha_id: true,
			},
		});

		return allBus;
	}

	async createOnibus(onibus: Partial<OnibusDTO>) {
		console.log("aa");
		const companhia = await companhiaServices.findCompanhiaById(
			onibus.companhia
		);

		const precoBase = await PrecoServices.findPreco(companhia).then(
			(response) => {
				if (response === null) {
					console.log("é null");
					throw new CustomError(
						404,
						"General",
						"Companhia não encontrado",
						null,
						null,
						null
					);
				} else {
					return response;
				}
			}
		);

		const newBus = new Onibus();

		newBus.poltronas_valor = precoBase.poltrona_base;
		newBus.leitos_valor = precoBase.leito_base;
		newBus.semi_leitos_valor = precoBase.semi_leito_base;

		newBus.placa = onibus.placa;
		newBus.companhia_id = companhia;
		newBus.assentos_total = onibus.assentos_total;
		newBus.poltronas_disponiveis = onibus.poltronas_disponiveis;
		newBus.leitos_disponiveis = onibus.leitos_disponiveis;
		newBus.semi_leitos_disponiveis = onibus.semi_leitos_disponiveis;
		newBus.poltronas_total = onibus.poltronas_disponiveis.length;
		newBus.leitos_total = onibus.leitos_disponiveis.length;
		newBus.semi_leitos_total = onibus.semi_leitos_disponiveis.length;

		try {
			const saved = await dataSource.AppDataSource.getRepository(Onibus).save(
				newBus
			);
			console.log("saved", saved);
			return saved;
		} catch (error) {
			if (error instanceof QueryFailedError) {
				throw new CustomError(
					401,
					"Validation",
					"Erro de validação ao cadastrar onibus",
					[error.driverError.detail],
					null,
					null
				);
			}
		}
	}
}

const onibusService = new OnibusService();

export default onibusService;
