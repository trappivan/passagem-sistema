import PassagemServices from "../services/PassagemService";

export const tipos_assento = {
	poltrona: PassagemServices.poltronasDisponiveis,
	leito: PassagemServices.poltronasDisponiveis,
	semi_leito: PassagemServices.semi_leitosDisponiveis,
};
