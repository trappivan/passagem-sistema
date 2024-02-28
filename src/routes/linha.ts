import { Router } from "express";
import { LinhaController } from "../controller/LinhaController";

export const routerLinha = Router();

routerLinha.post("/create", new LinhaController().createLinha);

routerLinha.get("/", new LinhaController().getLinhas);
