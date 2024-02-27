import { Request, Response } from "express";
import { Onibus } from "../entity/Onibus";
import { AppDataSource } from "../data-source";

export async function createBus(req: Request, res: Response) {
	const {
		placa,
		companhia,
		assentos_total,
		poltronas_total,
		leitos_total,
		semi_leitos_total,
	} = req.body;
	const newBus = new Onibus();
	newBus.placa = placa;
	newBus.companhia = companhia;
	newBus.assentos_total = assentos_total;
	newBus.poltronas_total = poltronas_total;
	newBus.leitos_total = leitos_total;
	newBus.semi_leitos_total = semi_leitos_total;
	newBus.poltronas_disponiveis = 0;
	newBus.leitos_disponiveis = 0;
	newBus.semi_leitos_disponiveis = 0;
	newBus.poltronas_valor = 0;
	newBus.leitos_valor = 0;
	newBus.semi_leitos_valor = 0;
	const saved = await AppDataSource.getRepository(Onibus).save(newBus);
	console.log("saved", saved);
	res.send("createBus");
}

export async function getAllBus(req: Request, res: Response) {
	const allBus = await AppDataSource.getRepository(Onibus).find();
	console.log("allBus", allBus);
	res.send(allBus);
}
