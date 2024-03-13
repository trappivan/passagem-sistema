import { Router } from "express";
import { PrecoController } from "../controller/PrecoController";
import { precoCreateValidation } from "../middleware/validation/preco/create";

export const routerPreco = Router();

routerPreco.post(
	"/create",
	precoCreateValidation,
	new PrecoController().createPreco
);

routerPreco.get("/:companhia", new PrecoController().findPreco);
