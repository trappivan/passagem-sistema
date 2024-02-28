import { Router } from "express";
import { PassageiroController } from "../controller/PassageiroController";

export const passageiroRouter = Router();

passageiroRouter.post("/create", new PassageiroController().createPassageiro);

passageiroRouter.get("/", new PassageiroController().getPassageiros);
