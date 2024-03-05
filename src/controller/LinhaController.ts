import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Linha } from "../entity/Linha";

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

		const newLinha = new Linha();
		newLinha.companhia = companhia;
		newLinha.horario = horario;
		newLinha.embarque = embarque;
		newLinha.desembarque = desembarque;
		newLinha.nome = nome;
		newLinha.distancia_km = distancia_km;
		newLinha.onibus_id = onibus_id;
		const saved = await AppDataSource.getRepository(Linha).save(newLinha);
		console.log("saved", saved, saved.onibus_id);
		res.send("createLinha");
	}

	async getLinhas(req: Request, res: Response) {
		const linhas = await AppDataSource.getRepository(Linha).find({
			relations: {
				onibus_id: true,
				passagem: true,
			},
		});
		res.json(linhas);
	}
}
