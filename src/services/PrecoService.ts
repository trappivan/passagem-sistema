import { AppDataSource } from "../data-source";
import { Preco } from "../entity/Preco";

class PrecoService {
	async createPreco(preco: Partial<Preco>) {
		const newPreco = new Preco();

		newPreco.companhia = preco.companhia;
		newPreco.coeficiente_gaso = preco.coeficiente_gaso;
		newPreco.coeficiente_pedagio = preco.coeficiente_pedagio;
		newPreco.leito_base = preco.leito_base;
		newPreco.poltrona_base = preco.poltrona_base;
		newPreco.semi_leito_base = preco.semi_leito_base;

		const saved = await AppDataSource.getRepository(Preco).save(newPreco);

		console.log("saved", saved);

		return saved;
	}

	async findPreco(companhia: string) {
		const precoBase = AppDataSource.getRepository(Preco).findOne({
			where: { companhia: companhia },
		});

		return precoBase;
	}
}

const PrecoServices = new PrecoService();

export default PrecoServices;
