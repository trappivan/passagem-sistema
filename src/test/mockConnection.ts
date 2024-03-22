import path from "path";
import { DataSource } from "typeorm";
import { Passageiro } from "../entity/Passageiro";
import { Onibus } from "../entity/Onibus";
import { Linha } from "../entity/Linha";
import { Passagem } from "../entity/Passagem";
import { Preco } from "../entity/Preco";
import { Companhia } from "../entity/Companhia";

const mockConnection = {
	async create() {
		return new DataSource({
			type: "postgres",
			host: "localhost",
			port: 12345,
			username: "test",
			password: "test",
			database: "test",
			synchronize: true,
			logging: false,
			entities: [Passageiro, Onibus, Linha, Passagem, Preco, Companhia],
			migrations: [],
			subscribers: [],
			dropSchema: true,
		});
	},

	async clear() {
		const connection = mockConnection.create();
		(await connection).dropDatabase();
	},
};

export default mockConnection;
