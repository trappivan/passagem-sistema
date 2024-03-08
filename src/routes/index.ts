import { Router } from "express";
import { routerBus } from "./bus";
import { routerLinha } from "./linha";
import { routerPassagem } from "./passagem";
import { routerPreco } from "./preco";
import { routerPassageiro } from "./passageiro";

const routes = Router();

routes.use("/bus", routerBus);
routes.use("/linha", routerLinha);
routes.use("/passagem", routerPassagem);
routes.use("/preco", routerPreco);
routes.use("/passageiro", routerPassageiro);

export default routes;
