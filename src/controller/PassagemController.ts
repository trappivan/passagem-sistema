import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Passagem } from "../entity/Passagem";
import PassagemServices from "../services/PassagemService";
import { Linha } from "../entity/Linha";

export class PassagemController {
	async createPassagem(req: Request, res: Response) {
		const {
			passageiro_id,
			linha_id,
			numero_assento,
			valor_passagem,
			tipo_passagem,
		} = req.body;

		// create service that checks if the seat is available
		const resultado = await PassagemServices.assentoDisponivel(
			passageiro_id,
			linha_id,
			numero_assento,
			valor_passagem,
			tipo_passagem
		);

		if (!resultado.saved) {
			return res.status(404).send({ message: resultado.message });
		}

		return res.send({
			message: "Passagem criada com sucesso",
			passagem: resultado.saved,
		});
	}

	async getAllPassagens(req: Request, res: Response) {
		const resultado = await PassagemServices.getAll();
		res.status(201).send(resultado);
	}
}
