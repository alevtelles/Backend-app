import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createWorkspaceSchema, workspaceIdSchema } from "../validation/workspace.validation";
import { HTTPSTATUS } from "../config/http.config";
import { createWorkspaceSercive, getAllWorkspacesUserIsMemberService, getWorkspaceByIdService } from "../services/worlspace.service";
import { getMemberRoleInWorkspace } from "../services/member.service";



export const createWorkspaceController = asyncHandler(
    async (req: Request, res: Response) => {
        const body = createWorkspaceSchema.parse(req.body);

        const userId = req.user?._id;
        const { workspace } = await createWorkspaceSercive(userId, body);

        return res.status(HTTPSTATUS.CREATED).json({
            message: "Workspace criado com sucesso",
            workspace,
        })
    }
)

export const getAllWorkspacesUserIsMemberController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { workspaces } = await getAllWorkspacesUserIsMemberService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "User workspaces fetched successfully",
      workspaces,
    });
  }
);


export const getWorkspaceByIdController = asyncHandler(
    async (req: Request, res: Response) => {
        const workspaceId = workspaceIdSchema.parse(req.params.id);
        const userId = req.user?._id;

        await getMemberRoleInWorkspace(userId, workspaceId);

        const { workspace } = await getWorkspaceByIdService(workspaceId);

        return res.status(HTTPSTATUS.OK).json({
            message: "Workspace criado com sucesso!",
            workspace,
        })
    }
)