import { Request, Response } from "express";
import { Passageiro } from "../entity/Passageiro";
import { AppDataSource } from "../data-source";
import PassageiroServices from "../services/PassageiroService";

export class PassageiroController {
	async createPassageiro(req: Request, res: Response) {
		const { nome, cpf, email, telefone, data_nascimento } = req.body;

		PassageiroServices.createPassageiro(
			nome,
			cpf,
			email,
			telefone,
			data_nascimento
		).then(
			(newPassageiro) => {
				return res
					.status(201)
					.send({ message: "createPassageiro", newPassageiro: newPassageiro });
			},
			(error) => {
				return res
					.status(401)
					.send({ message: "Erro ao criar passageiro", error: error.message });
			}
		);

		// if (newPassageiro) {
		// 	return res.status(404).send({ message: "Erro ao criar passageiro" });
		// }
		// return res
		// 	.status(201)
		// 	.send({ message: "createPassageiro", newPassageiro: newPassageiro });
	}

	async getPassageiros(req: Request, res: Response) {
		const passageiros = await PassageiroServices.findPassageiros();

		res.status(201).json(passageiros);
	}
}
