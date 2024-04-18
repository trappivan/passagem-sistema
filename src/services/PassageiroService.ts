import { FindOperator, QueryFailedError } from "typeorm";
import dataSource from "../data-source";
import { Passageiro } from "../entity/Passageiro";
import { CustomError } from "../utils/CustomError";

class PassageiroService {
	async findPassageiroById(id: number) {
		const passageiro = await dataSource.AppDataSource.getRepository(Passageiro)
			.findOneBy({
				id: id,
			})
			.then((response) => {
				if (response === null) {
					const customError = new CustomError(
						404,
						"General",
						"Passageiro não encontrado",
						null,
						null,
						null
					);
					throw customError;
				}

				return response;
			});

		return passageiro;
	}

	async createPassageiro(passageiro: Passageiro) {
		const newPassageiro = new Passageiro();

		newPassageiro.nome = passageiro.nome;
		newPassageiro.cpf = passageiro.cpf;
		newPassageiro.email = passageiro.email;
		newPassageiro.telefone = passageiro.telefone;
		newPassageiro.criado_em = new Date();

		let saved: Passageiro;

		try {
			saved = await dataSource.AppDataSource.getRepository(Passageiro).save(
				newPassageiro
			);
		} catch (error) {
			const customError = new CustomError(
				401,
				"Unauthorized",
				"Não foi possível criar novo usuário",
				error.message,
				null,
				null
			);

			throw customError;
		}

		return saved;
	}

	async findPassageiros() {
		const passageiros = await dataSource.AppDataSource.getRepository(
			Passageiro
		).find({
			relations: {
				passagens: true,
			},
		});

		return passageiros;
	}
}

const PassageiroServices = new PassageiroService();

export default PassageiroServices;
