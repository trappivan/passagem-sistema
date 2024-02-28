import { Router } from "express";
import { BusController } from "../controller/BusController";

export const routerBus = Router();

routerBus.post("/create", new BusController().createBus);

routerBus.get("/", new BusController().getAllBus);
