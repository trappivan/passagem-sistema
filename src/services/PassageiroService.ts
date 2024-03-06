import { AppDataSource } from "../data-source";
import { Passageiro } from "../entity/Passageiro";

class PassageiroService {
	async findPassageiroById(id: number) {
		const passageiro = await AppDataSource.getRepository(Passageiro).findOne({
			where: { id: id },
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

		const saved = await AppDataSource.getRepository(Passageiro).save(
			newPassageiro
		);
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
