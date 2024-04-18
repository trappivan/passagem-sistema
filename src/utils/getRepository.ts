import { Repository, Entity, EntityTarget } from "typeorm";
import dataSource from "../data-source";

const handleGetRepository = <T>(entity: EntityTarget<T>): Repository<T> => {
	const environment = envConfig.NODE_ENV || "development";
	return environment === "test"
		? dataSource.TestDataSource.manager.getRepository(entity)
		: dataSource.AppDataSource.manager.getRepository(entity);
};
