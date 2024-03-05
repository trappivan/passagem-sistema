import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Passagem } from "../entity/Passagem";
import PassagemServices from "../services/PassagemService";

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
		const seatAvailability = await PassagemServices.criarPassagem(
			linha_id,
			numero_assento,
			tipo_passagem
		);
		console.log(seatAvailability.error);
		if (seatAvailability.error) {
			return res.status(400).send({ message: seatAvailability.error });
		}
		console.log("seatAvailability", seatAvailability);
		const newPassagem = new Passagem();
		newPassagem.passageiro = passageiro_id;
		newPassagem.linha_id = linha_id;
		newPassagem.numero_assento = numero_assento;
		newPassagem.valor_passagem = valor_passagem;
		const saved = await AppDataSource.getRepository(Passagem).save(newPassagem);
		console.log("saved passagem", saved);
		return res
			.send({ message: "Passagem criada com sucesso" })
			.json(newPassagem);
	}

	async getAllPassagens(req: Request, res: Response) {
		const passagens = await AppDataSource.getRepository(Passagem).find({
			relations: {
				passageiro: true,
				linha_id: true,
			},
		});
		console.log(passagens);
		res.send(passagens);
	}
}
