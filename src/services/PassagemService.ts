import { AppDataSource } from "../data-source";
import { PassageiroDTO } from "../dto/passageiro-request";
import { Linha } from "../entity/Linha";
import { Onibus } from "../entity/Onibus";
import { Passageiro } from "../entity/Passageiro";
import { Passagem } from "../entity/Passagem";
import { CustomError } from "../utils/CustomError";
import LinhaServices from "./LinhaService";
import PassageiroServices from "./PassageiroService";

class PassagemService {
	async leitosDisponiveis(assento: Linha, assento_posicao: number) {
		if (assento.onibus_id.leitos_disponiveis.length === 0) {
			return { message: "Nenhum assento disponível." };
		}

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

		return saved;
	}
	async poltronasDisponiveis(assento: Linha, assento_posicao: number) {
		if (assento.onibus_id.poltronas_disponiveis.length === 0) {
			return { message: "Nenhum assento disponível." };
		}
		const assentoDisponivel = assento.onibus_id.poltronas_disponiveis.filter(
			(e: number) => (e === assento_posicao ? true : null)
		);

		if (assentoDisponivel.length === 0) {
			return { error: "Assento indisponível." };
		}

		assento.onibus_id.poltronas_disponiveis =
			assento.onibus_id.poltronas_disponiveis.filter(
				(e: number) => e !== assento_posicao
			);

		const saved = await AppDataSource.getRepository(Onibus).save(
			assento.onibus_id
		);

		return saved;
	}
	async semi_leitosDisponiveis(assento: Linha, assento_posicao: number) {
		if (assento.onibus_id.semi_leitos_disponiveis.length === 0) {
			return { error: "Nenhum assento disponível." };
		}
		const assentoDisponivel = assento.onibus_id.semi_leitos_disponiveis.filter(
			(e: number) => (e === assento_posicao ? true : null)
		);

		if (assentoDisponivel.length === 0) {
			return { error: "Assento indisponível." };
		}

		assento.onibus_id.semi_leitos_disponiveis =
			assento.onibus_id.semi_leitos_disponiveis.filter(
				(e: number) => e !== assento_posicao
			);

		const saved = await AppDataSource.getRepository(Onibus).save(
			assento.onibus_id
		);

		return saved;
	}
	async assentoDisponivel(
		linha_id: number,
		numero_assento: number,
		valor_passagem: number,
		tipo_passagem: string,
		token: string
	) {
		// const passageiro = await PassageiroServices.findPassageiroById(
		// 	passageiro_id
		// ).then((response) => {
		// 	if (response === null) {
		// 		throw new CustomError(
		// 			404,
		// 			"General",
		// 			"Passageiro não encontrado",
		// 			null,
		// 			null,
		// 			null
		// 		);
		// 	}
		// 	return response;
		// });

		const linha = await LinhaServices.getLinhaById(linha_id).then(
			(response) => {
				if (response === null) {
					throw new CustomError(
						404,
						"General",
						"Linha não encontrada",
						null,
						null,
						null
					);
				}
				return response;
			}
		);

		const assento = await AppDataSource.getRepository(Linha).findOne({
			relations: ["onibus_id"],
			where: { id: linha_id },
			// Adicionar lock para evitar que duas pessoas comprem o mesmo assento
			// lock: { mode: "pessimistic_write", tables: ["onibus"] },
		});

		let resultado;

		if (tipo_passagem === "leito") {
			resultado = await this.leitosDisponiveis(assento, numero_assento);
		}

		if (tipo_passagem === "poltrona") {
			resultado = await this.poltronasDisponiveis(assento, numero_assento);
		}

		if (tipo_passagem === "semi_leito") {
			resultado = await this.semi_leitosDisponiveis(assento, numero_assento);
		}

		if (resultado.error) {
			return { message: resultado.error };
		}

		const newPassagem = new Passagem();

		newPassagem.linha_id = linha;
		newPassagem.numero_assento = numero_assento;
		newPassagem.valor_passagem = valor_passagem;
		newPassagem.tipo_assento = tipo_passagem;
		newPassagem.pagamento_status = 1;
		newPassagem.tokenSession = token;

		let saved: Passagem;

		try {
			await AppDataSource.getRepository(Passagem).save(newPassagem);
		} catch (error) {
			throw new CustomError(
				401,
				"Unauthorized",
				"Não foi possível criar nova passagem",
				error.message,
				null,
				null
			);
		}

		return { saved: saved, message: "Passagem reservada com sucesso" };
	}

	async createPassagem(id: number, token: string, passageiro: Passageiro) {
		const newPassageiro = await PassageiroServices.createPassageiro(passageiro);

		const PassagemToken = await AppDataSource.getRepository(Passagem)
			.findOne({
				where: { tokenSession: token },
			})
			.then((response) => {
				if (response === null) {
					throw new CustomError(
						404,
						"General",
						"Token não encontrado",
						null,
						null,
						null
					);
				}
				return response;
			});
		console.log("PassagemToken", PassagemToken);
		const newPassagem = new Passagem();

		newPassagem.passageiro = newPassageiro;
		newPassagem.pagamento_status = 2;

		let saved;

		try {
			saved = await AppDataSource.getRepository(Passagem)
				.update(
					{ id: PassagemToken.id },
					{
						passageiro: newPassagem.passageiro,
						pagamento_status: newPassagem.pagamento_status,
					}
				)
				.then((response) => {
					return response;
				})
				.catch((error) => {
					throw new CustomError(
						401,
						"Unauthorized",
						"Não foi possível criar nova passagem",
						error.message,
						null,
						null
					);
				});
		} catch (error) {
			const customError = new CustomError(
				401,
				"Unauthorized",
				"Não foi possível criar nova passagem",
				error.message,
				null,
				null
			);

			throw customError;
		}
		return saved;
	}

	async getAll() {
		const passagens = await AppDataSource.getRepository(Passagem).find({
			relations: {
				passageiro: true,
				linha_id: true,
			},
		});

		return passagens;
	}
}

const PassagemServices = new PassagemService();

export default PassagemServices;
