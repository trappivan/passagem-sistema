import { NextFunction, Request, Response } from "express";
import PassagemServices from "../services/PassagemService";
import { Passageiro } from "../entity/Passageiro";
import { Passagem } from "../entity/Passagem";

export class PassagemController {
	async reservarPassagem(req: Request, res: Response, next: NextFunction) {
		const { linha_id, numero_assento, valor_passagem, tipo_passagem } =
			req.body;
		console.log("req.session.id", req.session.id);
		if (!req.session.id) {
			return res.status(401).json({ message: "Usuário não autenticado" });
		}
		console.log(req.session.cookie.expires);
		await PassagemServices.assentoDisponivel(
			linha_id,
			numero_assento,
			valor_passagem,
			tipo_passagem,
			req.session.id
		)
			.then((response) => {
				return res.status(201).json(response);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async criarPassagem(req: Request, res: Response, next: NextFunction) {
		const { id, cpf, email, nome, telefone }: Partial<Passageiro & Passagem> =
			req.body;

		const tokenSession = req.session.id;

		if (!tokenSession) {
			return res.status(401).json({ message: "Usuário não autenticado" });
		}

		await PassagemServices.createPassagem(id, tokenSession, {
			cpf,
			email,
			nome,
			telefone,
		})
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
