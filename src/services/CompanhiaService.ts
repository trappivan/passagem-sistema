import { DataSource } from "typeorm";
import { CompanhiaDTO } from "../dto/companhia-request";
import { AppDataSource } from "../data-source";
import { CustomError } from "../utils/CustomError";
import { Companhia } from "../entity/Companhia";

export class CompanhiaServices {
	private dataSource: DataSource;

	constructor(appDataSource: DataSource) {
		this.dataSource = appDataSource;
	}

	async createCompanhia(companhia: Partial<CompanhiaDTO>) {
		// checks if companhia already exists
		await this.findCompanhiaByName(companhia.nome).then((response) => {
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
		});

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
				[error.driverError.detail],
				null,
				null
			);
		}

		return saved;
	}

	async findCompanhiaByName(nome: string) {
		const companhia = await AppDataSource.getRepository(Companhia).findOne({
			where: { nome: nome },
		});

		return companhia;
	}

	async findCompanhiaById(id: number) {
		const companhia = await AppDataSource.getRepository(Companhia).findOne({
			where: { id: id },
		});
		console.log("companhiaa", companhia);
		return companhia;
	}

	async findAllCompany() {
		const companhias = await this.dataSource
			.getRepository(Companhia)
			.find()
			.then((response) => {
				return response;
			})
			.catch((error) => {
				throw new CustomError(
					401,
					"General",
					"Erro ao buscar todas as companhias",
					[error.message],
					null,
					null
				);
			});
		console.log("companhiaaas", companhias);
		return companhias;
	}
}

const companhiaServices = new CompanhiaServices(AppDataSource);

export default companhiaServices;
