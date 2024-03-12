import { Router } from "express";
import { BusController } from "../controller/BusController";
import { onibusCreateValidation } from "../middleware/validation/onibus/create";
import { onibusGetOneValidation } from "../middleware/validation/onibus/getOne";

export const routerBus = Router();

routerBus.post(
	"/create",
	onibusCreateValidation,
	new BusController().createBus
);

routerBus.get("/", new BusController().getAllBus);

routerBus.get(
	"/:id",
	onibusGetOneValidation,
	new BusController().getOnibusById
);
