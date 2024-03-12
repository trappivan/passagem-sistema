import { Router } from "express";
import { LinhaController } from "../controller/LinhaController";
import { linhaCreateValidation } from "../middleware/validation/linha/create";
import { linhaGetOneValidation } from "../middleware/validation/linha/getOne";

export const routerLinha = Router();

routerLinha.post(
	"/create",
	linhaCreateValidation,
	new LinhaController().createLinha
);

routerLinha.get("/", new LinhaController().getLinhas);

routerLinha.get(
	"/:id",
	linhaGetOneValidation,
	new LinhaController().getLinhaById
);
