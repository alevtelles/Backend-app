import { HTTPSTATUS, type HttpStatusCodeType } from "../config/http.config";
import { ErrorCodeEnum, type ErrorCodeEnumType } from "../enums/error-code.enum";

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

export class HttpException extends AppError{
    // biome-ignore lint/complexity/noUselessConstructor: <explanation>
    constructor(
        message: "Http Exception Error",
        statusCode: HttpStatusCodeType, 
        errorCode?: ErrorCodeEnumType,
    ) {
        super(message, statusCode, errorCode);
    }
}


export class InternalServerException extends AppError {
    constructor(
        message = "Erro interno do servidor",
        errorCode?: ErrorCodeEnumType,
    ) {
        super(
            message,
            HTTPSTATUS.INTERNAL_SERVER_ERROR,
            errorCode || ErrorCodeEnum.INTERNAL_SERVER_ERROR,
        )
    }
}

export class NotFoundException extends AppError {
    constructor(
        message = "Recurso não encontrado",
        errorCode?: ErrorCodeEnumType,
    ) {
        super(
            message,
            HTTPSTATUS.NOT_FOUND,
            errorCode || ErrorCodeEnum.RESOURCE_NOT_FOUND,
        )
    }
}