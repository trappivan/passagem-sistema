import { Router } from "express";
import { PassagemController } from "../controller/PassagemController";
import { passagemCreateValidation } from "../middleware/validation/passagem/passagemCreate";
import { passageiroCreateValidation } from "../middleware/validation/passageiro/create";
import { PassageiroController } from "../controller/PassageiroController";
import { permissionHandler } from "../middleware/permissionHandler";

export const routerPassagem = Router();

routerPassagem.post(
	"/reservar",
	[passagemCreateValidation, permissionHandler(["admin", "user", "guest"])],
	new PassagemController().reservarPassagem
);

routerPassagem.post(
	"/criar",
	[passageiroCreateValidation, permissionHandler(["admin", "user", "guest"])],
	[
		new PassageiroController().createPassageiro,
		new PassagemController().criarPassagem,
	]
);

routerPassagem.get(
	"/",
	permissionHandler(["admin"]),
	new PassagemController().getAllPassagens
);
