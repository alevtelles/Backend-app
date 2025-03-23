import { HTTPSTATUS, type HttpStatusCodeType } from "../config/http.config";
import type { ErrorCodeEnumType } from "../enums/error-code.enum";

export class AppError extends Error {
	public statusCode: HttpStatusCodeType;
	public errorCode: ErrorCodeEnumType;

	constructor(
		message: string,
		statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR,
		errorCode?: ErrorCodeEnumType,
	) {
		super(message);
		this.statusCode = statusCode;
		this.errorCode = errorCode || "INTERNAL_SERVER_ERROR";
		Error.captureStackTrace(this, this.constructor);
	}
}
