import { Router } from "express";
import { LinhaController } from "../controller/LinhaController";
import { linhaCreateValidation } from "../middleware/validation/linha/create";
import { linhaGetOneValidation } from "../middleware/validation/linha/getOne";
import { permissionHandler } from "../middleware/permissionHandler";

export const routerLinha = Router();

routerLinha.post(
	"/create",
	[linhaCreateValidation, permissionHandler(["admin"])],
	new LinhaController().createLinha
);

routerLinha.get(
	"/",
	permissionHandler(["admin", "user", "guest"]),
	new LinhaController().getLinhas
);

routerLinha.get(
	"/:id",
	[linhaGetOneValidation, permissionHandler(["admin", "user"])],
	new LinhaController().getLinhaById
);
