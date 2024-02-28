import { AppDataSource } from "../data-source";
import { Passagem } from "../entity/Passagem";

export const PassagemRepository = AppDataSource.getRepository(Passagem);
