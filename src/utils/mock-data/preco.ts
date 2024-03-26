import { Preco } from "../../entity/Preco";
import { companhiaMock } from "./companhia";

export const precoMock: Preco = {
	coeficiente_gaso: 0.1,
	coeficiente_pedagio: 0.2,
	companhia_id: companhiaMock,
	id: 1,
	leito_base: 100,
	poltrona_base: 100,
	semi_leito_base: 100,
};
