import { AppDataSource } from "../data-source";
import { Linha } from "../entity/Linha";
import { Onibus } from "../entity/Onibus";

class PassagemService {
	async leitosDisponiveis(assento: Linha[], assento_posicao: number) {
		const assentoDisponivel = assento[0].onibus_id.leitos_disponiveis.filter(
			(e: number) => (e === assento_posicao ? true : null)
		);

		if (assentoDisponivel.length === 0) {
			return { error: "Assento indisponível" };
		}

		assento[0].onibus_id.leitos_disponiveis =
			assento[0].onibus_id.leitos_disponiveis.filter(
				(e) => e !== assento_posicao
			);

		const saved = await AppDataSource.getRepository(Onibus).save(
			assento[0].onibus_id
		);
		console.log("saved", saved);
		return saved;
	}
	async poltronasDisponiveis(assento: Linha[], assento_posicao: number) {
		const assentoDisponivel = assento[0].onibus_id.poltronas_disponiveis.filter(
			(e: number) => (e === assento_posicao ? true : null)
		);

		if (assentoDisponivel.length === 0) {
			return { error: "Assento indisponível" };
		}

		assento[0].onibus_id.poltronas_disponiveis =
			assento[0].onibus_id.poltronas_disponiveis.filter(
				(e: number) => e !== assento_posicao
			);

		const saved = await AppDataSource.getRepository(Onibus).save(
			assento[0].onibus_id
		);
		console.log("saved", saved);
		return saved;
	}
	async semi_leitosDisponiveis(assento: Linha[], assento_posicao: number) {
		const assentoDisponivel =
			assento[0].onibus_id.semi_leitos_disponiveis.filter((e: number) =>
				e === assento_posicao ? true : null
			);

		if (assentoDisponivel.length === 0) {
			return { error: "Assento indisponível" };
		}

		assento[0].onibus_id.semi_leitos_disponiveis =
			assento[0].onibus_id.semi_leitos_disponiveis.filter(
				(e: number) => e !== assento_posicao
			);

		const saved = await AppDataSource.getRepository(Onibus).save(
			assento[0].onibus_id
		);
		console.log("saved", saved);
		return saved;
	}
	async criarPassagem(linha_id: any, assento_posicao?: any, classe?: any) {
		const assento = await AppDataSource.getRepository(Linha).find({
			relations: ["onibus_id"],
			where: { id: linha_id },
			// Adicionar lock para evitar que duas pessoas comprem o mesmo assento
			// lock: { mode: "pessimistic_write", tables: ["onibus"] },
		});

		let resultado;

		if (classe === "leito") {
			resultado = await this.leitosDisponiveis(assento, assento_posicao);
		}
		if (classe === "poltrona") {
			resultado = await this.poltronasDisponiveis(assento, assento_posicao);
		}
		if (classe === "semi_leito") {
			resultado = await this.semi_leitosDisponiveis(assento, assento_posicao);
		}

		return resultado;
	}
}

let PassagemServices = new PassagemService();

export default PassagemServices;
