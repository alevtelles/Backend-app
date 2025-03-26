import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { config } from "../config/app.config";
import { registerSchema } from "../validation/aurh.validation";
import { HTTPSTATUS } from "../config/http.config";
import { registerUserService } from "../services/auth.service";
import passport from "passport";

export const googleLoginCallback = asyncHandler(
    async (req: Request, res: Response) => {
        const currentWorkspace = req.user?.currentWorkspace;

        if(!currentWorkspace){
            return res.redirect(
                `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
            )
        }
        return res.redirect(
            `${config.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`
        )
    }
);


export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({
      ...req.body,
    });

    await registerUserService(body);

    res.status(HTTPSTATUS.CREATED).json({
      message: "Usuário criado com sucesso",
    });
  }
);


export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: Error | null, user: Express.User | false, info?: { message: string }) => {
      if (err) {
        return next(err); // Deixa o middleware de erro tratar
      }
      
      if (!user) {
        return res.status(HTTPSTATUS.UNAUTHORIZED).json({
          message: info?.message || "Credenciais inválidas",
        });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(HTTPSTATUS.OK).json({
          message: "Login realizado com sucesso",
          user: user // Considere retornar informações mínimas do usuário
        });
      });
    })(req, res, next);
  }
);

