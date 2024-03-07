import { Router } from "express";
import { PrecoController } from "../controller/PrecoController";

export const routerPreco = Router();

routerPreco.post("/create", new PrecoController().createPreco);

routerPreco.get("/:companhia", new PrecoController().findPreco);
