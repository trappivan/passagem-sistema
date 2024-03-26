import { Passageiro } from "../../entity/Passageiro";
import { passagemMock } from "./passagem";

export const passageiroMock: Passageiro = {
	cpf: "123456789",
	email: "teste@teste.com",
	nome: "Passageiro Teste",
	telefone: "123456789",
	criado_em: new Date(),
	id: 1,
	passagens: [passagemMock],
};
