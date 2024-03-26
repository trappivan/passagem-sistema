import { Passagem } from "../../entity/Passagem";
import { linhaMock } from "./linha";
import { passageiroMock } from "./passageiro";

export const passagemMock: Passagem = {
	id: 1,
	linha_id: linhaMock,
	numero_assento: 1,
	pagamento_status: 3,
	passageiro: passageiroMock,
	tipo_assento: "Poltrona",
	tokenSession: "123456",
	valor_passagem: 50,
};
