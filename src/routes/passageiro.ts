import { Router } from "express";
import { PassageiroController } from "../controller/PassageiroController";
import { passageiroValidator } from "../middleware/validation/passageiroValidator";

export const routerPassageiro = Router();

routerPassageiro.post(
	"/create",
	[passageiroValidator],
	new PassageiroController().createPassageiro
);

routerPassageiro.get("/", new PassageiroController().getPassageiros);
