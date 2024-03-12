import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Linha } from "../entity/Linha";
import LinhaServices from "../services/LinhaService";
import { CustomError } from "../utils/CustomError";

export class LinhaController {
	async createLinha(req: Request, res: Response, next: NextFunction) {
		const {
			companhia,
			horario,
			embarque,
			desembarque,
			nome,
			distancia_km,
			onibus_id,
		} = req.body;

		await LinhaServices.createLinhas({
			companhia,
			horario,
			embarque,
			desembarque,
			nome,
			distancia_km,
			onibus_id,
		})
			.then((response) => {
				return res
					.status(201)
					.send({ message: "Linha criada", linha: response });
			})
			.catch((error: CustomError) => {
				return next(error);
			});
	}

	async getLinhaById(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
		const linha = await LinhaServices.getLinhaById(Number(id));

		if (!linha) {
			return res.status(404).send({ message: "Linha não encontrada" });
		}

		return res.status(201).json(linha);
	}

	async getLinhas(req: Request, res: Response) {
		const linhas = await LinhaServices.getLinhas();

		return res.status(201).json(linhas);
	}
}
