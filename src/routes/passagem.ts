import { Router } from "express";
import {
	createPassagem,
	getAllPassagens,
} from "../controller/PassagemController";

export const routerPassagem = Router();

routerPassagem.post("/create", createPassagem);

routerPassagem.get("/", getAllPassagens);
