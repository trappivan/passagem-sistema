import { DataSource } from "typeorm";
import { CompanhiaDTO } from "../dto/companhia-request";
import { AppDataSource } from "../data-source";
import { CustomError } from "../utils/CustomError";
import { Companhia } from "../entity/Companhia";

export class CompanhiaServices {
	async createCompanhia(companhia: Partial<CompanhiaDTO>) {
		// checks if companhia already exists
		console.log("response get repository");
		const bomba = await this.findCompanhiaById(companhia.id).then(
			(response) => {
				if (response !== null) {
					throw new CustomError(
						401,
						"Unauthorized",
						"Companhia já cadastrada",
						null,
						null,
						null
					);
				}
				return response;
			}
		);
		console.log("bomba", bomba);
		const newCompanhia = new Companhia();

		newCompanhia.cnpj = companhia.cnpj;
		newCompanhia.endereco = companhia.endereco;
		newCompanhia.nome = companhia.nome;
		newCompanhia.regiao = companhia.regiao;

		let saved: Companhia;

		try {
			saved = await AppDataSource.getRepository(Companhia).save(newCompanhia);
		} catch (error) {
			throw new CustomError(
				401,
				"General",
				"Não foi possível salvar a companhia",
				[error.message],
				null,
				null
			);
		}

		return saved;
	}

	async findCompanhiaById(id: number) {
		const companhia = await AppDataSource.getRepository(Companhia).findOne({
			where: { id: id },
		});

		return companhia;
	}
}

const companhiaServices = new CompanhiaServices();

export default companhiaServices;
