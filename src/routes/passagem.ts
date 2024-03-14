import { Router } from "express";
import { PassagemController } from "../controller/PassagemController";
import { passagemCreateValidation } from "../middleware/validation/passagem/passagemCreate";
import { passageiroCreateValidation } from "../middleware/validation/passageiro/create";
import { PassageiroController } from "../controller/PassageiroController";

export const routerPassagem = Router();

routerPassagem.post(
	"/reservar",
	passagemCreateValidation,
	new PassagemController().reservarPassagem
);

routerPassagem.post("/criar", passageiroCreateValidation, [
	new PassageiroController().createPassageiro,
	new PassagemController().criarPassagem,
]);

routerPassagem.get("/", new PassagemController().getAllPassagens);
