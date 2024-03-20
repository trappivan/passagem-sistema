import { Router } from "express";
import { PrecoController } from "../controller/PrecoController";
import { precoCreateValidation } from "../middleware/validation/preco/create";
import { permissionHandler } from "../middleware/permissionHandler";

export const routerPreco = Router();

routerPreco.post(
	"/create",
	[precoCreateValidation, permissionHandler(["admin"])],
	new PrecoController().createPreco
);

routerPreco.get(
	"/:companhia",
	permissionHandler(["admin", "user"]),
	new PrecoController().findPreco
);
