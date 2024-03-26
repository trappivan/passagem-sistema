import { Companhia } from "../../entity/Companhia";
import { linhaMock } from "./linha";
import { precoMock } from "./preco";
import { onibusMock } from "./onibus";

export const companhiaMock: Companhia = {
	id: 1,
	linhas: [linhaMock],
	onibus: [onibusMock],
	preco: precoMock,
	cnpj: "123456789",
	endereco: "Rua Teste",
	nome: "Empresa Teste",
	regiao: ["Sul", "Norte"],
};
