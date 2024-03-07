import { AppDataSource } from "../data-source";
import { Linha } from "../entity/Linha";
import onibusService from "./OnibusService";

class LinhaService {
	async createLinhas(
		companhia: string,
		horario: string,
		embarque: string,
		desembarque: string,
		nome: string,
		distancia_km: number,
		onibus_id: number
	) {
		const onibus = await onibusService.getOnibusById(onibus_id);

		if (!onibus) {
			return { message: "Onibus não encontrado" };
		}

		const newLinha = new Linha();

		newLinha.companhia = companhia;
		newLinha.horario = horario;
		newLinha.embarque = embarque;
		newLinha.desembarque = desembarque;
		newLinha.nome = nome;
		newLinha.distancia_km = distancia_km;
		newLinha.onibus_id = onibus;

		const saved = await AppDataSource.getRepository(Linha).save(newLinha);
		console.log("saved", saved, saved.onibus_id);
		return saved;
	}

	async getLinhaById(id: Linha) {
		const linha = await AppDataSource.getRepository(Linha).findOne({
			where: id,
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
