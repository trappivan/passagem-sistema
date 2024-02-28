import { Router } from "express";
import { PassagemController } from "../controller/PassagemController";

export const routerPassagem = Router();

routerPassagem.post("/create", new PassagemController().createPassagem);

routerPassagem.get("/", new PassagemController().getAllPassagens);
