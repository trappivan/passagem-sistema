import { Router } from "express";
import { companhiaGetOneValidation } from "../middleware/validation/companhia/getOne";
import { CompanhiaController } from "../controller/CompanhiaController";
import { companhiaCreateValidation } from "../middleware/validation/companhia/create";

export const routerCompanhia = Router();

routerCompanhia.get(
	"/:id",
	companhiaGetOneValidation,
	new CompanhiaController().findCompanyById
);

routerCompanhia.post(
	"/create",
	companhiaCreateValidation,
	new CompanhiaController().createCompanhia
);
