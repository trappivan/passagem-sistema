import { AppDataSource } from "../data-source";
import { Onibus } from "../entity/Onibus";

class OnibusService {
	async getOnibusById(id: number) {
		const onibus = await AppDataSource.getRepository(Onibus).findOne({
			where: { id: id },
		});
		return onibus;
	}
}

const onibusService = new OnibusService();

export default onibusService;
