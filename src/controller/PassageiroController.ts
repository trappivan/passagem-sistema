import { Request, Response } from "express";
import { Passageiro } from "../entity/Passageiro";
import { AppDataSource } from "../data-source";

export async function createPassageiro(req: Request, res: Response) {
	const { nome, cpf, email, telefone, data_nascimento } = req.body;
	const newPassageiro = new Passageiro();
	newPassageiro.nome = nome;
	newPassageiro.cpf = cpf;
	newPassageiro.email = email;
	newPassageiro.telefone = telefone;
	newPassageiro.data_nascimento = data_nascimento;
	newPassageiro.cadastrado = false;
	newPassageiro.criado_em = new Date();
	newPassageiro.atualizado_em = new Date();

	const saved = await AppDataSource.getRepository(Passageiro).save(
		newPassageiro
	);
	console.log("saved", saved);
	res.send("createPassageiro");
}
