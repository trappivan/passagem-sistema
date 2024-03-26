import { Onibus } from "../../entity/Onibus";
import { companhiaMock } from "./companhia";

export const onibusMock: Onibus = {
	placa: "ABC1234",
	assentos_total: 40,
	poltronas_disponiveis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	leitos_disponiveis: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
	semi_leitos_disponiveis: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
	companhia_id: companhiaMock,
	id: 1,
	leitos_total: 10,
	leitos_valor: 100,
	linha_id: null,
	poltronas_total: 20,
	poltronas_valor: 50,
	semi_leitos_total: 10,
	semi_leitos_valor: 75,
};
