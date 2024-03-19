export class PermissionEnum {
	//Companhia

	static createCompanhia = "createCompanhia";
	static findCompanhiaById = "findCompanhiaById";
	static findAllCompany = "findAllCompany";

	//Onibus

	static createOnibus = "createOnibus";
	static findOnibusById = "findOnibusById";
	static findAllBus = "findAllBus";

	//Preco
	static createPreco = "createPreco";
	static findPrecoById = "findPrecoById";
	static findAllPrice = "findAllPrice";

	//Linha
	static createLinha = "createLinha";
	static findLinhaById = "findLinhaById";
	static findAllLinhas = "findAllLinhas";

	//Passageiro
	static createPassageiro = "createPassageiro";
	static findPassageiroById = "findPassageiroById";
	static findAllPassageiros = "findAllPassageiros";

	//Passagem
	static createPassagem = "createPassagem";
	static findPassagemById = "findPassagemById";
	static findAllPassagens = "findAllPassagens";
	static reservarPassagem = "reservarPassagem";

	async admin() {
		return [
			PermissionEnum.createCompanhia,
			PermissionEnum.findCompanhiaById,
			PermissionEnum.findAllCompany,
			PermissionEnum.createOnibus,
			PermissionEnum.reservarPassagem,
			PermissionEnum.findOnibusById,
			PermissionEnum.findAllBus,
			PermissionEnum.createPreco,
			PermissionEnum.findPrecoById,
			PermissionEnum.findAllPrice,
			PermissionEnum.createLinha,
			PermissionEnum.findLinhaById,
			PermissionEnum.findAllLinhas,
			PermissionEnum.createPassageiro,
			PermissionEnum.findPassageiroById,
			PermissionEnum.findAllPassageiros,
			PermissionEnum.createPassagem,
			PermissionEnum.findPassagemById,
			PermissionEnum.findAllPassagens,
		];
	}
	async guest() {
		return [
			PermissionEnum.reservarPassagem,
			PermissionEnum.findOnibusById,
			PermissionEnum.findAllBus,
			PermissionEnum.createPassagem,
			PermissionEnum.findAllLinhas,
			PermissionEnum.findLinhaById,
			PermissionEnum.createPassageiro,
			PermissionEnum.findLinhaById,
		];
	}

	async user() {
		return [
			PermissionEnum.createPassagem,
			PermissionEnum.findPassagemById,
			PermissionEnum.findAllPassagens,
			PermissionEnum.reservarPassagem,
			PermissionEnum.findOnibusById,
			PermissionEnum.findAllBus,
			PermissionEnum.createPassageiro,
			PermissionEnum.findPassageiroById,
			PermissionEnum.findAllPassageiros,
			PermissionEnum.findAllLinhas,
			PermissionEnum.findLinhaById,
		];
	}

	async getPermission(role: string) {
		console.log("role", role);
		if (role === "admin") {
			return this.admin();
		} else if (role === "guest") {
			return this.guest();
		} else if (role === "user") {
			return this.user();
		}
	}
}
