import express from "express";
import dataSource from "./data-source";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import routes from "./routes";
import session from "express-session";

dotenv.config();

export const main = async () => {
	try {
		await dataSource.AppDataSource.initialize();

		const app = express();

		app.use(express.json());

		app.use(routes);

		app.use(errorHandler);

		app.listen(process.env.PORT, () => {
			console.log("Server running on port 3000");
		});
	} catch (error) {
		console.error("Error on database connection", error);
	}
};

main();
