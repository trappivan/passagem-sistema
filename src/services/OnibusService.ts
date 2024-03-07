import { on } from "events";
import { AppDataSource } from "../data-source";
import { Onibus } from "../entity/Onibus";
import PrecoServices from "./PrecoService";
import { QueryFailedError } from "typeorm";

class OnibusService {
	async getOnibusById(id: number) {
		const onibus = await AppDataSource.getRepository(Onibus).findOne({
			where: { id: id },
		});
		return onibus;
	}

	async createOnibus(onibus: Partial<Onibus>) {
		const newBus = new Onibus();

		const precoBase = await PrecoServices.findPreco(onibus.companhia);

		if (!precoBase) {
			return { message: "Companhia não encontrada" };
		}

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
				throw new Error(error.driverError.detail);
			}
		}
	}
}

const onibusService = new OnibusService();

export default onibusService;
