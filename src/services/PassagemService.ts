import { AppDataSource } from "../data-source";
import { Linha } from "../entity/Linha";
import { Onibus } from "../entity/Onibus";
import { Passageiro } from "../entity/Passageiro";
import { Passagem } from "../entity/Passagem";
import LinhaServices from "./LinhaService";
import PassageiroServices from "./PassageiroService";

class PassagemService {
	async leitosDisponiveis(assento: Linha, assento_posicao: number) {
		const assentoDisponivel = assento.onibus_id.leitos_disponiveis.filter(
			(e: number) => (e === assento_posicao ? true : null)
		);

		if (assentoDisponivel.length === 0) {
			return { error: "Assento indisponível" };
		}

		assento.onibus_id.leitos_disponiveis =
			assento.onibus_id.leitos_disponiveis.filter((e) => e !== assento_posicao);

		const saved = await AppDataSource.getRepository(Onibus).save(
			assento.onibus_id
		);
		console.log("saved", saved);
		return saved;
	}
	async poltronasDisponiveis(assento: Linha, assento_posicao: number) {
		const assentoDisponivel = assento.onibus_id.poltronas_disponiveis.filter(
			(e: number) => (e === assento_posicao ? true : null)
		);

		if (assentoDisponivel.length === 0) {
			return { error: "Assento indisponível" };
		}

		assento.onibus_id.poltronas_disponiveis =
			assento.onibus_id.poltronas_disponiveis.filter(
				(e: number) => e !== assento_posicao
			);

		const saved = await AppDataSource.getRepository(Onibus).save(
			assento.onibus_id
		);
		console.log("saved", saved);
		return saved;
	}
	async semi_leitosDisponiveis(assento: Linha, assento_posicao: number) {
		console.log(assento);
		const assentoDisponivel = assento.onibus_id.semi_leitos_disponiveis.filter(
			(e: number) => (e === assento_posicao ? true : null)
		);

		if (assentoDisponivel.length === 0) {
			return { error: "Assento indisponível" };
		}

		assento.onibus_id.semi_leitos_disponiveis =
			assento.onibus_id.semi_leitos_disponiveis.filter(
				(e: number) => e !== assento_posicao
			);

		const saved = await AppDataSource.getRepository(Onibus).save(
			assento.onibus_id
		);
		console.log("saved", saved);
		return saved;
	}
	async assentoDisponivel(
		passageiro_id: number,
		linha_id: number,
		numero_assento: number,
		valor_passagem: number,
		tipo_passagem: string
	) {
		const passageiro = await PassageiroServices.findPassageiroById(
			passageiro_id
		);
		console.log(passageiro);
		if (!passageiro) {
			return { message: "Passageiro não encontrado" };
		}

		const linha = await LinhaServices.getLinhaById(linha_id);

		if (!linha) {
			return { message: "Linha não encontrada" };
		}
		const assento = await AppDataSource.getRepository(Linha).find({
			relations: ["onibus_id"],
			where: { id: linha_id },
			// Adicionar lock para evitar que duas pessoas comprem o mesmo assento
			// lock: { mode: "pessimistic_write", tables: ["onibus"] },
		});

		let resultado;

		if (tipo_passagem === "leito") {
			resultado = await this.leitosDisponiveis(assento[0], numero_assento);
		}

		if (tipo_passagem === "poltrona") {
			resultado = await this.poltronasDisponiveis(assento[0], numero_assento);
		}

		if (tipo_passagem === "semi_leito") {
			resultado = await this.semi_leitosDisponiveis(assento[0], numero_assento);
		}

		if (resultado.error) {
			return { message: resultado.error };
		}

		const newPassagem = new Passagem();

		newPassagem.passageiro = passageiro;
		newPassagem.linha_id = linha;
		newPassagem.numero_assento = numero_assento;
		newPassagem.valor_passagem = valor_passagem;
		newPassagem.tipo_assento = tipo_passagem;

		const saved = await AppDataSource.getRepository(Passagem).save(newPassagem);

		return { saved: saved, message: "Passagem criada com sucesso" };
	}
	async getAll() {
		const passagens = await AppDataSource.getRepository(Passagem).find({
			relations: {
				passageiro: true,
				linha_id: true,
			},
		});

		console.log(passagens);

		return passagens;
	}
}

const PassagemServices = new PassagemService();

export default PassagemServices;
