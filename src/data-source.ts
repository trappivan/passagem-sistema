import "reflect-metadata";
import { DataSource } from "typeorm";
import { Passageiro } from "./entity/Passageiro";
import { Onibus } from "./entity/Onibus";
import { Linha } from "./entity/Linha";
import { Passagem } from "./entity/Passagem";
import { Preco } from "./entity/Preco";
import { Companhia } from "./entity/Companhia";

export const AppDataSource = new DataSource({
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
});
