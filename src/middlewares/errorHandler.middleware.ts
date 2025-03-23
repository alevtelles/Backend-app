import type { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";

export const errorHandler: ErrorRequestHandler = (
	error,
	req,
	res,
	next,
) => {

    console.error(`Ocorreu um erro no caminho: ${req.path}`, error);

    if(error instanceof SyntaxError) {
         res.status(HTTPSTATUS.BAD_REQUEST).json({
            message: "Formato inválido. Por favor, verifique sua solicitação",
        });
    }

    if (error instanceof AppError) {
         res.status(HTTPSTATUS.BAD_REQUEST).json({
            message: error.message,
            errorCode: error.errorCode,
        })
    }

     res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Erro interno no servidor",
        error: error?.message || "Ocorreu um erro inesperado, tente novamente mais tarde",
    });
};