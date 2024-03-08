import express from "express";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import routes from "./routes";

dotenv.config();
AppDataSource.initialize()
	.then(async () => {
		console.log("Database connected", AppDataSource.isInitialized);
	})
	.catch((error) => console.log(error));

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
	console.log("Server running on port 3000");
});
