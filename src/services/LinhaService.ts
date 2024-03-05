import { AppDataSource } from "../data-source";
import { Linha } from "../entity/Linha";

class LinhaService {
	async getLinhaById(id: number) {
		const linha = await AppDataSource.getRepository(Linha).findOne({
			where: { id: id },
		});
		return linha;
	}
}

const LinhaServices = new LinhaService();

export default LinhaServices;
