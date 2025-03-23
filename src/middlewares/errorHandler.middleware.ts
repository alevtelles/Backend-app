import type { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";

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

    // Erro genérico
     res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Erro interno no servidor",
        error: error?.message || "Ocorreu um erro inesperado, tente novamente mais tarde",
    });
};