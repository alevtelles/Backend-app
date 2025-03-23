import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
	error,
	req,
	res,
	next,
) => {

    console.error(`Ocorreu um erro no caminho: ${req.path}`, error);

    if(error instanceof SyntaxError) {
         res.status(400).json({
            message: "Formato inválido. Por favor, verifique sua solicitação",
        });
    }

    // Erro genérico
     res.status(500).json({
        message: "Erro interno no servidor",
        error: error?.message || "Ocorreu um erro inesperado, tente novamente mais tarde",
    });
};