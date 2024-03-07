import { Request, Response } from "express";
import { Preco } from "../entity/Preco";
import PrecoServices from "../services/PrecoService";

export class PrecoController {
	async createPreco(req: Request, res: Response) {
		const {
			companhia,
			coeficiente_gaso,
			coeficiente_pedagio,
			leito_base,
			poltrona_base,
			semi_leito_base,
		}: Preco = req.body;

		const preco = await PrecoServices.createPreco({
			coeficiente_gaso,
			coeficiente_pedagio,
			companhia,
			leito_base,
			poltrona_base,
			semi_leito_base,
		} as Partial<Preco>);

		if (!preco) {
			return res.status(400).send("Erro ao criar preço");
		}

		return res.status(201).json(preco);
	}

	async findPreco(req: Request, res: Response) {
		const { companhia }: Partial<Preco> = req.params;

		const preco = await PrecoServices.findPreco(companhia);

		if (!preco) {
			return res.status(404).send("Preço não encontrado");
		}

		return res.status(200).json(preco);
	}
}
