import { FindOperator, QueryFailedError } from "typeorm";
import { AppDataSource } from "../data-source";
import { Passageiro } from "../entity/Passageiro";
import { CustomError } from "../utils/CustomError";

class PassageiroService {
	async findPassageiroById(id: number) {
		const passageiro = await AppDataSource.getRepository(Passageiro)
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

	async createPassageiro(
		nome: string,
		cpf: string,
		email: string,
		telefone: string,
		data_nascimento: string
	) {
		const newPassageiro = new Passageiro();

		newPassageiro.nome = nome;
		newPassageiro.cpf = cpf;
		newPassageiro.email = email;
		newPassageiro.telefone = telefone;
		newPassageiro.data_nascimento = new Date(data_nascimento);
		newPassageiro.cadastrado = false;
		newPassageiro.criado_em = new Date();
		newPassageiro.atualizado_em = new Date();

		let saved: Passageiro;

		try {
			saved = await AppDataSource.getRepository(Passageiro).save(newPassageiro);
		} catch (error) {
			const customError = new CustomError(
				401,
				"Unauthorized",
				"Não foi possível criar novo passageiro",
				error.message,
				null,
				null
			);

			throw customError;
		}

		return saved;
	}

	async findPassageiros() {
		const passageiros = await AppDataSource.getRepository(Passageiro).find({
			relations: {
				passagens: true,
			},
		});

		return passageiros;
	}
}

const PassageiroServices = new PassageiroService();

export default PassageiroServices;
