import type { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";
import { z, ZodError } from "zod";
import { ErrorCodeEnum } from "../enums/error-code.enum";


const formatZodError = (res: Response, error: z.ZodError) => {
    const errors = error?.issues?.map((err) => ({
        field: err.path.join("."),
        message: err.message,
    }));

    res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Erro de validação",
        errors: errors,
        errorCode: ErrorCodeEnum.VALIDATION_ERROR,
    });
};

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

   if (error instanceof ZodError){
    return formatZodError(res, error);
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