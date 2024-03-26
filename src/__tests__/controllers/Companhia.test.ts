import { DataSource, Repository } from "typeorm";
import { Companhia } from "../../entity/Companhia";
import companhiaServices, {
	CompanhiaServices,
} from "../../services/CompanhiaService";
import mockConnection from "../../test/mockConnection";
import { CompanhiaController } from "../../controller/CompanhiaController";
import { Response, request } from "express";
import { linhaMock } from "../../utils/mock-data/linha";
import { companhiaMock } from "../../utils/mock-data/companhia";

describe("Companhia Controller", () => {
	let companhiaController: CompanhiaController;
	let companhiaService: CompanhiaServices;

	beforeEach(() => {
		companhiaController = new CompanhiaController();
		companhiaService = companhiaServices;
	});

	it("find all companies", async () => {
		const result: Companhia[] = [companhiaMock];

		jest
			.spyOn(companhiaService, "findAllCompany")
			.mockImplementation(async () => result);
		const mockResponse: any = () => {
			const res: any = {};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);
			return res;
		};
		let a = companhiaService.findAllCompany();
		console.log("aaa", a);
		// console.log(
		// 	"companhiaController.findAllCompany(res)",
		// 	companhiaController.findAllCompany(res)
		// );
		expect(await companhiaController.findAllCompany(mockResponse)).toBe(result);
	});
});
