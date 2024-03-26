import { Linha } from "../../entity/Linha";
import { companhiaMock } from "./companhia";
import { passagemMock } from "./passagem";
import { onibusMock } from "./onibus";

export const linhaMock: Linha = {
	companhia_id: companhiaMock,
	desembarque: "São Paulo",
	distancia_km: 1000,
	embarque: "Rio de Janeiro",
	id: 1,
	horario: "21:00 - 23:00",
	nome: "Linha Teste",
	onibus_id: onibusMock,
	passagem: [passagemMock],
};
