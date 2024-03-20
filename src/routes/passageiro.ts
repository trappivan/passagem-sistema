import { Router } from "express";
import { PassageiroController } from "../controller/PassageiroController";
import { passageiroCreateValidation } from "../middleware/validation/passageiro/create";
import { passageiroGetByIdValidation } from "../middleware/validation/passageiro/getOne";
import { permissionHandler } from "../middleware/permissionHandler";

export const routerPassageiro = Router();

routerPassageiro.post(
	"/create",
	[passageiroCreateValidation, permissionHandler(["admin"])],
	new PassageiroController().createPassageiro
);

routerPassageiro.get(
	"/",
	permissionHandler(["admin"]),
	new PassageiroController().getPassageiros
);

routerPassageiro.get(
	"/:id",
	[passageiroGetByIdValidation, permissionHandler(["admin", "user"])],
	new PassageiroController().getPassageiroById
);
