import { DataSource } from "typeorm";
import { Companhia } from "../../entity/Companhia";
import companhiaServices, {
	CompanhiaServices,
} from "../../services/CompanhiaService";
import mockConnection from "../../test/mockConnection";
import { CompanhiaController } from "../../controller/CompanhiaController";
import { Response } from "express";

let connection: DataSource;

beforeAll(async () => {
	connection = await mockConnection.create();
});

describe("Companhia Controller", () => {
	it("Get all companies", async () => {
		connection.getRepository(Companhia).find = jest
			.fn()
			.mockResolvedValue(["asdasd"]);
		const companies = await new CompanhiaServices(connection).findAllCompany();
		expect(companies).toMatchObject(["asdasd"]);
	});
});
