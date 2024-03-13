import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Passagem } from "../entity/Passagem";
import PassagemServices from "../services/PassagemService";
import { Linha } from "../entity/Linha";

export class PassagemController {
	async createPassagem(req: Request, res: Response, next: NextFunction) {
		const {
			passageiro_id,
			linha_id,
			numero_assento,
			valor_passagem,
			tipo_passagem,
		} = req.body;

		await PassagemServices.assentoDisponivel(
			passageiro_id,
			linha_id,
			numero_assento,
			valor_passagem,
			tipo_passagem
		)
			.then((response) => {
				return res.status(201).json(response);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async getAllPassagens(req: Request, res: Response) {
		const resultado = await PassagemServices.getAll();

		res.status(201).send(resultado);
	}
}
