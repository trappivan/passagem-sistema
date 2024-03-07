import { Request, Response } from "express";
import { Onibus } from "../entity/Onibus";
import { AppDataSource } from "../data-source";
import onibusService from "../services/OnibusService";

export class BusController {
	async createBus(req: Request, res: Response) {
		const {
			placa,
			companhia,
			assentos_total,
			poltronas_disponiveis,
			leitos_disponiveis,
			semi_leitos_disponiveis,
			linha_id,
		} = req.body;

		const newOnibus = onibusService.createOnibus({
			placa: placa,
			companhia: companhia,
			assentos_total: assentos_total,
			poltronas_disponiveis: poltronas_disponiveis,
			leitos_disponiveis: leitos_disponiveis,
			semi_leitos_disponiveis: semi_leitos_disponiveis,
			linha_id: linha_id,
		} as Partial<Onibus>);

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
