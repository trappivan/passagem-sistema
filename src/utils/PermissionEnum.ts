import { CustomError } from "./CustomError";

export class PermissionEnum {
	role: string;

	constructor(role: string) {
		this.role = role;
	}
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

	private static admin() {
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
	private static guest() {
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

	private static user() {
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

	async getPermission() {
		console.log("roleee ", this.role);
		if (this.role === "admin") {
			return PermissionEnum.admin();
		} else if (this.role === "guest") {
			return PermissionEnum.guest();
		} else if (this.role === "user") {
			return PermissionEnum.user();
		} else {
			throw new CustomError(401, "Unauthorized", "User role not found");
		}
	}
}
