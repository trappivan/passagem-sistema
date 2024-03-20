import { NextFunction, Request, Response } from "express";
import { PermissionEnum } from "../utils/PermissionEnum";
import { CustomError } from "../utils/CustomError";

export const permissionHandler = (permissions: string[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const user = req.get("user");

		if (!user) {
			return next(new CustomError(401, "General", "Usuário não autenticado"));
		}

		if (!permissions.includes(user)) {
			return next(
				new CustomError(
					401,
					"General",
					"Usuário não tem permissão para acessar este recurso"
				)
			);
		}
		return next();
	};
};
