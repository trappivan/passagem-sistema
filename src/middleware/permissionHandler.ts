import { NextFunction, Request, Response } from "express";
import { PermissionEnum } from "../utils/PermissionEnum";

export const permissionHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.get("user");

	if (!user) {
		res.status(401).json({ message: "User role not found" });
	}

	const role = await new PermissionEnum().getPermission(user);
	console.log("roleeeee", role);
	console.log("user", user);

	return next();
};
