import { Router } from "express";
import { createBus, getAllBus } from "../controller/BusController";

export const routerBus = Router();

routerBus.post("/create", createBus);

routerBus.get("/", getAllBus);
