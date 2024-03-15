import { NextFunction, Request, Response } from "express";
import { Preco } from "../entity/Preco";
import PrecoServices from "../services/PrecoService";

export class PrecoController {
	async createPreco(req: Request, res: Response, next: NextFunction) {
		const {
			companhia_id,
			coeficiente_gaso,
			coeficiente_pedagio,
			leito_base,
			poltrona_base,
			semi_leito_base,
		}: Preco = req.body;

		await PrecoServices.createPreco({
			coeficiente_gaso,
			coeficiente_pedagio,
			companhia_id,
			leito_base,
			poltrona_base,
			semi_leito_base,
		})
			.then((response) => {
				return res.status(201).json(response);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async findPreco(req: Request, res: Response, next: NextFunction) {
		const { companhia_id }: Partial<Preco> = req.params;

		await PrecoServices.findPreco(companhia_id)
			.then((response) => {
				return res.status(200).json(response);
			})
			.catch((error) => {
				return next(error);
			});
	}
}
