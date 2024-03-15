import { NextFunction, Request, Response } from "express";
import { CompanhiaDTO } from "../dto/companhia-request";
import companhiaServices from "../services/CompanhiaService";

export class CompanhiaController {
	async createCompanhia(req: Request, res: Response, next: NextFunction) {
		const { cnpj, endereco, nome, regiao }: Partial<CompanhiaDTO> = req.body;
		console.log("entrou dto");
		await companhiaServices
			.createCompanhia({ cnpj, endereco, nome, regiao })
			.then((response) => {
				console.log("resss create  companhia");
				return res
					.status(201)
					.send({ message: "createCompanhia", companhia: response });
			})
			.catch((error) => {
				return next(error);
			});
	}

	async findCompanyById(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		await companhiaServices
			.findCompanhiaById(Number(id))
			.then((response) => {
				return res.status(200).json(response);
			})
			.catch((error) => {
				return next(error);
			});
	}
}
