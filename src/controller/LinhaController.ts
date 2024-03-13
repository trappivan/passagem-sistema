import { NextFunction, Request, Response, response } from "express";
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

		await LinhaServices.getLinhaById(Number(id))
			.then((response) => {
				return res.status(200).json(response);
			})
			.catch((error: CustomError) => {
				return next(error);
			});
	}

	async getLinhas(req: Request, res: Response) {
		const linhas = await LinhaServices.getLinhas();

		return res.status(201).json(linhas);
	}
}
