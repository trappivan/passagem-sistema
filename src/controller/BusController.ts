import { Request, Response } from "express";
import { Onibus } from "../entity/Onibus";
import { AppDataSource } from "../data-source";

export class BusController {
	async createBus(req: Request, res: Response) {
		const {
			placa,
			companhia,
			assentos_total,
			poltronas_total,
			leitos_total,
			semi_leitos_total,
			linha_id,
		} = req.body;
		const newBus = new Onibus();
		newBus.placa = placa;
		newBus.companhia = companhia;
		newBus.assentos_total = assentos_total;
		newBus.poltronas_total = Array.from(Array(poltronas_total).keys());
		newBus.leitos_total = Array.from(Array(leitos_total).keys());
		newBus.semi_leitos_total = Array.from(Array(semi_leitos_total).keys());
		newBus.linha_id = linha_id;
		newBus.poltronas_disponiveis = [1, 2, 3, 4, 5, 6];
		newBus.leitos_disponiveis = Array.from(Array(10).keys());
		newBus.semi_leitos_disponiveis = Array.from(Array(10).keys());
		newBus.poltronas_valor = 0;
		newBus.leitos_valor = 0;
		newBus.semi_leitos_valor = 0;
		const saved = await AppDataSource.getRepository(Onibus).save(newBus);
		console.log("saved", saved);
		res.send("createBus");
	}

	async getAllBus(req: Request, res: Response) {
		const allBus = await AppDataSource.getRepository(Onibus).find({
			relations: {
				linha_id: true,
			},
		});
		console.log("allBus", allBus);
		res.send(allBus);
	}
}
