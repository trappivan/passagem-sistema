import { Router } from "express";
import { companhiaGetOneValidation } from "../middleware/validation/companhia/getOne";
import { CompanhiaController } from "../controller/CompanhiaController";
import { companhiaCreateValidation } from "../middleware/validation/companhia/create";
import { permissionHandler } from "../middleware/permissionHandler";

export const routerCompanhia = Router();

routerCompanhia.get(
	"/:id",
	companhiaGetOneValidation,
	new CompanhiaController().findCompanyById
);

routerCompanhia.post(
	"/create",
	[companhiaCreateValidation],
	new CompanhiaController().createCompanhia
);

routerCompanhia.get(
	"/",
	permissionHandler,
	new CompanhiaController().findAllCompany
);
