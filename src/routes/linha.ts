import { Router } from "express";
import { createLinha } from "../controller/LinhaController";

export const routerLinha = Router();

routerLinha.post("/create", createLinha);
