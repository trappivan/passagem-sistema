import express, { Express, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Passageiro } from "./entity/Passageiro";
import dotenv from "dotenv";

dotenv.config();
AppDataSource.initialize()
	.then(async () => {
		console.log("Inserting a new user into the database...");
		const user = new Passageiro();
		user.nome = "Timber";
		user.cadastrado = false;
		user.cpf = "12345678901";
		user.data_nascimento = new Date("2004-01-10");
		user.email = "ivangabrieltrapp@gmail.com";
		user.telefone = "47997261113";
		user.criado_em = new Date();
		user.atualizado_em = new Date();
		await AppDataSource.manager.save(user);
		console.log("Saved a new user with id: " + user.id);
		console.log("Loading users from the database...");
		const users = await AppDataSource.manager.find(Passageiro);
		console.log("Loaded users: ", users);
		// console.log(
		// 	"Here you can setup and run express / fastify / any other framework."
		// );
	})
	.catch((error) => console.log(error));

const app = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
	console.log("Server running on port 3000");
});
