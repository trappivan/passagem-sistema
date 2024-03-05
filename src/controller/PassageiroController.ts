import { Request, Response } from "express";
import { Passageiro } from "../entity/Passageiro";
import { AppDataSource } from "../data-source";
import PassageiroServices from "../services/PassageiroService";

export class PassageiroController {
	async createPassageiro(req: Request, res: Response) {
		const { nome, cpf, email, telefone, data_nascimento } = req.body;

		const newPassageiro = PassageiroServices.createPassageiro(
			nome,
			cpf,
			email,
			telefone,
			data_nascimento
		);

		if (!newPassageiro) {
			return res.status(404).send({ message: "Erro ao criar passageiro" });
		}
		return res.status(201).send({ message: "createPassageiro" });
	}

	async getPassageiros(req: Request, res: Response) {
		const passageiros = await AppDataSource.getRepository(Passageiro).find({
			relations: {
				passagens: true,
			},
		});
		res.json(passageiros);
	}
}
