import mongoose from "mongoose";
import { type Document, Schema } from "mongoose";
import { RolesDocument } from "./roles-permission.model";

export interface MemberDocument extends Document {
    userId: mongoose.Types.ObjectId;
    workspaceId: mongoose.Types.ObjectId;
    role: RolesDocument;
    joinedAt: Date;
}

const memberSchema = new Schema<MemberDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    workspaceId: {
        type: Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
},

    { timestamps: true }
)

const MemberModel = mongoose.model<MemberDocument>('Member', memberSchema);
export default MemberModel;