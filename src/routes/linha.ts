import { Router } from "express";
import { createLinha, getLinhas } from "../controller/LinhaController";

export const routerLinha = Router();

routerLinha.post("/create", createLinha);

routerLinha.get("/", getLinhas);
