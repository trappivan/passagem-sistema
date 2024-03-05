import express from "express";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";
import { routerBus } from "./routes/bus";
import { routerLinha } from "./routes/linha";
import { passageiroRouter } from "./routes/passageiro";
import { routerPassagem } from "./routes/passagem";

dotenv.config();
AppDataSource.initialize()
	.then(async () => {
		console.log("Database connected", AppDataSource.isInitialized);
	})
	.catch((error) => console.log(error));

const app = express();

app.use(express.json());

app.use("/bus", routerBus);

app.use("/linha", routerLinha);

app.use("/passageiro", passageiroRouter);

app.use("/passagem", routerPassagem);

app.listen(process.env.PORT, () => {
	console.log("Server running on port 3000");
});
