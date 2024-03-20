import { Router } from "express";
import { BusController } from "../controller/BusController";
import { onibusCreateValidation } from "../middleware/validation/onibus/create";
import { onibusGetOneValidation } from "../middleware/validation/onibus/getOne";
import { permissionHandler } from "../middleware/permissionHandler";

export const routerBus = Router();

routerBus.post(
	"/create",
	[onibusCreateValidation, permissionHandler(["admin"])],
	new BusController().createBus
);

routerBus.get(
	"/",
	permissionHandler(["admin", "user"]),
	new BusController().getAllBus
);

routerBus.get(
	"/:id",
	[onibusGetOneValidation, permissionHandler(["admin", "user"])],
	new BusController().getOnibusById
);
