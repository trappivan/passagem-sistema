import { NextFunction, Request, Response } from "express";
import { Onibus } from "../entity/Onibus";
import onibusService from "../services/OnibusService";
import { CustomError } from "../utils/CustomError";

export class BusController {
	async createBus(req: Request, res: Response, next: NextFunction) {
		const {
			placa,
			companhia,
			assentos_total,
			poltronas_disponiveis,
			leitos_disponiveis,
			semi_leitos_disponiveis,
		}: Partial<Onibus> = req.body;

		await onibusService
			.createOnibus({
				placa,
				companhia,
				assentos_total,
				poltronas_disponiveis,
				leitos_disponiveis,
				semi_leitos_disponiveis,
			})
			.then((onibus) => {
				return res.status(201).send({ message: "createBus", onibus: onibus });
			})
			.catch((error: CustomError) => {
				return next(error);
			});
	}

	async getOnibusById(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		await onibusService
			.getOnibusById(Number(id))
			.then((response) => {
				return res.status(200).json(response);
			})
			.catch((error: CustomError) => {
				return next(error);
			});
	}

	async getAllBus(req: Request, res: Response) {
		const onibus = await onibusService.getAllBus();

		res.status(200).json(onibus);
	}
}
