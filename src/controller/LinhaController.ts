import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Linha } from "../entity/Linha";
import LinhaServices from "../services/LinhaService";

export class LinhaController {
	async createLinha(req: Request, res: Response) {
		const {
			companhia,
			horario,
			embarque,
			desembarque,
			nome,
			distancia_km,
			onibus_id,
		} = req.body;

		const linha = await LinhaServices.createLinhas(
			companhia,
			horario,
			embarque,
			desembarque,
			nome,
			distancia_km,
			onibus_id
		);

		if (!linha) {
			return res.status(404).send({ message: "Erro ao criar linha" });
		}

		res.status(201).send({ message: "createLinha", linha: linha });
	}

	async getLinhaById(req: Request, res: Response) {
		const { id } = req.body;
		const linha = await LinhaServices.getLinhaById(id);

		if (!linha) {
			return res.status(404).send({ message: "Linha não encontrada" });
		}

		res.status(201).json(linha);
	}

	async getLinhas(req: Request, res: Response) {
		const linhas = await LinhaServices.getLinhas();

		res.status(201).json(linhas);
	}
}
