import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Passagem } from "../entity/Passagem";
import { PassagemRepository } from "../repositories/PassagemRepository";

export class PassagemController {
	async createPassagem(req: Request, res: Response) {
		const { passageiro_id, linha_id, numero_assento, valor_passagem } =
			req.body;
		const newPassagem = new Passagem();
		newPassagem.passageiro = passageiro_id;
		newPassagem.linha_id = linha_id;
		newPassagem.numero_assento = numero_assento;
		newPassagem.valor_passagem = valor_passagem;
		const saved = await AppDataSource.getRepository(Passagem).save(newPassagem);
		console.log("saved", saved);
		res.send("createPassagem");
	}

	async getAllPassagens(req: Request, res: Response) {
		const passagens = await PassagemRepository.find({
			relations: {
				passageiro: true,
				linha_id: true,
			},
		});
		console.log(passagens);
		res.send(passagens);
	}
}
