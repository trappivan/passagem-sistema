import { ValidationError } from "class-validator";
import { ErrorType, ErrorValidation, ErrorResponse } from "./types";

export class CustomError extends Error {
	public httpStatusCode: number;
	public errorType: ErrorType;
	public errors: string[] | null;
	public errorRaw: any;
	public errorsValidation: ValidationError[] | null;

	constructor(
		httpStatusCode: number,
		errorType: ErrorType,
		message: string,
		errors: string[] | null = null,
		errorRaw: any = null,
		errorsValidation: ValidationError[] | null = null
	) {
		super(message);

		this.name = this.constructor.name;

		this.httpStatusCode = httpStatusCode;
		this.errorType = errorType;
		this.errors = errors;
		this.errorRaw = errorRaw;
		this.errorsValidation = errorsValidation;
	}

	// get HttpStatusCode() {
	// 	console.log(
	// 		"chamou getter",
	// 		this.httpStatusCode,
	// 		typeof this.httpStatusCode
	// 	);
	// 	return this.httpStatusCode;
	// }

	// get JSON() {
	// 	return {
	// 		errorType: this.errorType,
	// 		errorMessage: this.message,
	// 		errors: this.errors,
	// 		errorRaw: this.errorRaw,
	// 		errorsValidation: this.errorsValidation.map((e, i) => {
	// 			return {
	// 				property: e.property,
	// 				constraints: e.constraints,
	// 			};
	// 		}),
	// 		stack: this.stack,
	// 	};
	// }
}
