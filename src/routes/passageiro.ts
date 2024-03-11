import { Router } from "express";
import { PassageiroController } from "../controller/PassageiroController";
import { passageiroCreateValidation } from "../middleware/validation/passageiro/passageiroCreate";
import { passageiroGetByIdValidation } from "../middleware/validation/passageiro/passageiroGetById";

export const routerPassageiro = Router();

routerPassageiro.post(
	"/create",
	passageiroCreateValidation,
	new PassageiroController().createPassageiro
);

routerPassageiro.get("/", new PassageiroController().getPassageiros);

routerPassageiro.get(
	"/:id",
	passageiroGetByIdValidation,
	new PassageiroController().getPassageiroById
);
