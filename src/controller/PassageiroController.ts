import { NextFunction, Request, Response, response } from "express";
import { Passageiro } from "../entity/Passageiro";
import { AppDataSource } from "../data-source";
import PassageiroServices from "../services/PassageiroService";
import { errorHandler } from "../middleware/errorHandler";

export class PassageiroController {
	async createPassageiro(req: Request, res: Response, next: NextFunction) {
		const { nome, cpf, email, telefone, data_nascimento } = req.body;

		PassageiroServices.createPassageiro(
			nome,
			cpf,
			email,
			telefone,
			data_nascimento
		)
			.then((newPassageiro) => {
				return res
					.status(201)
					.send({ message: "createPassageiro", newPassageiro: newPassageiro });
			})
			.catch((error) => {
				return next(error);
			});
	}

	async getPassageiros(req: Request, res: Response) {
		const passageiros = await PassageiroServices.findPassageiros();

		res.status(201).json(passageiros);
	}

	async getPassageiroById(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		await PassageiroServices.findPassageiroById(Number(id))
			.then((response) => {
				return res.status(200).json(response);
			})
			.catch((error) => {
				return next(error);
			});
	}
}
