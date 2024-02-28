import { Router } from "express";
import { createPassageiro } from "../controller/PassageiroController";

export const passageiroRouter = Router();

passageiroRouter.post("/create", createPassageiro);
