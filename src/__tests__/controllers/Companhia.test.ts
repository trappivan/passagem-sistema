import { DataSource, Repository } from "typeorm";
import companhiaServices, {
	CompanhiaServices,
} from "../../services/CompanhiaService";
import mockConnection from "../../test/mockConnection";
import { Response, request } from "express";
import { linhaMock } from "../../utils/mock-data/linha";
import { companhiaMock } from "../../utils/mock-data/companhia";
import { Companhia } from "../../entity/Companhia";
import { CompanhiaController } from "../../controller/CompanhiaController";

// describe("Companhia Controller", () => {
// 	let companhiaController: CompanhiaController;
// 	let companhiaService: CompanhiaServices;

// 	beforeEach(() => {
// 		companhiaController = new CompanhiaController();
// 		companhiaService = companhiaServices;
// 	});

// 	it("find all companies", async () => {
// 		const result: Companhia[] = [companhiaMock];

// 		jest
// 			.spyOn(companhiaService, "findAllCompany")
// 			.mockImplementation(async () => result);
// 		const mockResponse: any = () => {
// 			const res: any = {};
// 			res.status = jest.fn().mockReturnValue(res);
// 			res.json = jest.fn().mockReturnValue(res);
// 			return res;
// 		};
// 		let a = companhiaService.findAllCompany();
// 		console.log("aaa", a);
// 		// console.log(
// 		// 	"companhiaController.findAllCompany(res)",
// 		// 	companhiaController.findAllCompany(res)
// 		// );
// 		expect(await companhiaController.findAllCompany(mockResponse)).toBe(result);
// 	});
describe("Companhia Controller", () => {
	let companhiaController: CompanhiaController;

	beforeEach(() => {
		companhiaController = new CompanhiaController();
	});

	it("should find all companies", async () => {
		const result = [
			/* mock data */
			companhiaMock,
		];

		jest.spyOn(companhiaController, "findAllCompany").mockImplementation(() => {
			return result;
		});

		const mockResponse: any = () => {
			const res: any = {};
			res.status = jest.fn().mockReturnValue(res);
			res.json = jest.fn().mockReturnValue(res);
			return res;
		};

		const response = await companhiaController.findAllCompany(mockResponse);

		expect(response).toBe(result);
	});
});

// create a unit test for the CompanhiaController controller and test the findAllCompany method
