import mongoose from "mongoose";
import { type Document, Schema } from "mongoose";
import { genrateInviteCode } from "../utils/uuid";

export interface WorkspaceDocument extends Document {
	name: string;
	description: string;
	owner: mongoose.Types.ObjectId;
	inviteCode: string;
	createdAt: Date;
	updatedAt: Date;
}

const workspaceSchema = new Schema<WorkspaceDocument>({
    name: {type: String, required: true, trim: true },
    description: {type: String, required: false},
    owner:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    inviteCode: {type: String, required: true, unique: true, default: genrateInviteCode},
    },
    {
        timestamps: true,
    }
);

workspaceSchema.methods.resetInviteCode = function() {
    this.inviteCode = genrateInviteCode();
}

const WorkspaceModel = mongoose.model<WorkspaceDocument>(
    "Workspace", 
    workspaceSchema
);

export default WorkspaceModel