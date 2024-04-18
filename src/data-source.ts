import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Passageiro } from "./entity/Passageiro";
import { Onibus } from "./entity/Onibus";
import { Linha } from "./entity/Linha";
import { Passagem } from "./entity/Passagem";
import { Preco } from "./entity/Preco";
import { Companhia } from "./entity/Companhia";

const AppDataSourceConfig: DataSourceOptions = {
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "1234",
	database: "postgres",
	synchronize: true,
	logging: false,
	entities: [Passageiro, Onibus, Linha, Passagem, Preco, Companhia],
	migrations: [],
	subscribers: [],
};

const TestDataSourceConfig: DataSourceOptions = {
	type: "postgres",
	host: "localhost",
	port: 2345,
	username: "test",
	password: "test",
	database: "test",
	synchronize: true,
	logging: false,
	dropSchema: true,
	entities: [Passageiro, Onibus, Linha, Passagem, Preco, Companhia],
	migrations: [],
	subscribers: [],
};

const AppDataSource = new DataSource(AppDataSourceConfig);
const TestDataSource = new DataSource(TestDataSourceConfig);

export default { AppDataSource, TestDataSource };
