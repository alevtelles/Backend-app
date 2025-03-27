import { ErrorCodeEnum } from "../enums/error-code.enum";
import MemberModel from "../models/member.model";
import WorkspaceModel from "../models/workspace.model"
import { NotFoundException, UnauthorizedException } from "../utils/appError";

export const getMemberRoleInWorkspace = async (
    userId: string, 
    workspaceId: string
) => {
    const workspace = await WorkspaceModel.findById(workspaceId);

    if(!workspace) {
        throw new NotFoundException("Workspace não encontrado");
    }

    const member = await MemberModel.findOne({
        userId,
        workspaceId
    }).populate("role");

    if(!member) {
        throw new UnauthorizedException(
            "Você não tem a permissão  para acessar o workspace",
             ErrorCodeEnum.ACCESS_UNAUTHORIZED
        );
    }

    const roleName = member.role?.name;

    return { role : roleName };

}