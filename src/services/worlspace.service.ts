import mongoose from "mongoose";
import { Roles } from "../enums/role.enum";
import MemberModel from "../models/member.model";
import RoleModel from "../models/roles-permission.model";
import UserModel from "../models/user.model";
import WorkspaceModel from "../models/workspace.model";
import { NotFoundException } from "../utils/appError";


export const createWorkspaceSercive = async (
    userId: string, 
    body: {
        name: string;
        description?: string | undefined
    }
    ) => {
        const { name, description } = body

        const user = await UserModel.findById(userId);

        if (!user) {
            throw new NotFoundException("Usuário não encontrado");
        }

        const ownerRole = await RoleModel.findOne({ name: Roles.OWNER });
        if (!ownerRole) {
            throw new NotFoundException("Perfil OWNER não encontrado");
        }

        const workspace = new WorkspaceModel({
            name: name,
            description: description,
            owner: user._id,
        })

        await workspace.save();

        const member = new MemberModel({
            userId: user._id,
            workspaceId: workspace._id,
            role: ownerRole._id,
            joinedAt: new Date(),
        })

        await member.save();

        user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;

        await user.save();

        return { workspace }
        

    }

export const getAllWorkspacesUserIsMemberService = async (userId: string) => {
  const memberships = await MemberModel.find({ userId })
    .populate("workspaceId")
    .select("-password")
    .exec();

  const workspaces = memberships.map((membership) => membership.workspaceId);

  return { workspaces };
};

export const getWorkspaceByIdService = async (workspaceId: string) => {
    const workspace = await WorkspaceModel.findById(workspaceId);

    if (!workspace) {
        throw new NotFoundException("Workspace não encontrado");
    }

    const members = await MemberModel.find({
        workspaceId,
    
    }).populate("role");

    const workspaceWhiteMembers = {
        ...workspace.toObject(),
        members,
    }

    return {
        workspace: workspaceWhiteMembers,
    }
    
}

export const getWorkspaceMembersService = async (workspaceId: string) => {

  const members = await MemberModel.find({
    workspaceId,
  })
    .populate("userId", "name email profilePicture -password")
    .populate("role", "name");

  const roles = await RoleModel.find({}, { name: 1, _id: 1 })
    .select("-permission")
    .lean();

  return { members, roles };
};
