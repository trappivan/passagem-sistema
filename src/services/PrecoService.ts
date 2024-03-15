import { AppDataSource } from "../data-source";
import { Companhia } from "../entity/Companhia";
import { Preco } from "../entity/Preco";
import { CustomError } from "../utils/CustomError";

class PrecoService {
	async createPreco(preco: Partial<Preco>) {
		const newPreco = new Preco();

		newPreco.companhia_id = preco.companhia_id;
		newPreco.coeficiente_gaso = preco.coeficiente_gaso;
		newPreco.coeficiente_pedagio = preco.coeficiente_pedagio;
		newPreco.leito_base = preco.leito_base;
		newPreco.poltrona_base = preco.poltrona_base;
		newPreco.semi_leito_base = preco.semi_leito_base;

		let saved: Preco;

		try {
			saved = await AppDataSource.getRepository(Preco).save(newPreco);
		} catch (error) {
			throw new CustomError(
				500,
				"General",
				"Erro ao salvar preço",
				[error.message],
				null,
				null
			);
		}

		return saved;
	}

	async findPreco(companhia: Companhia) {
		const precoBase = AppDataSource.getRepository(Preco)
			.findOne({
				relations: ["companhia"],
				where: companhia,
			})
			.then((response) => {
				console.log("response na query find preco ", response);
				if (response === null) {
					throw new CustomError(
						404,
						"General",
						"Preço não encontrado",
						null,
						null,
						null
					);
				}
				return response;
			});

		return precoBase;
	}
}

const PrecoServices = new PrecoService();

export default PrecoServices;
