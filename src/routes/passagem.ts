import { Router } from "express";
import { PassagemController } from "../controller/PassagemController";
import { passagemCreateValidation } from "../middleware/validation/passagem/passagemCreate";

export const routerPassagem = Router();

routerPassagem.post(
	"/create",
	passagemCreateValidation,
	new PassagemController().createPassagem
);

routerPassagem.get("/", new PassagemController().getAllPassagens);
