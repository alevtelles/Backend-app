import mongoose from "mongoose";
import { type Document, Schema } from "mongoose";
import { PermissionType, Permissions, Roles, RoleType } from "../enums/role.enum";
import { RolePermissions } from "../utils/roles-permission";

export interface RoleDocument extends Document {
    name: RoleType;
    permissions: Array<PermissionType>;
}

const roleSchema = new Schema<RoleDocument>({
    name: {
        type: String,
        enum: Object.values(Roles),
        required: true,
        unique: true,
    },
    permissions: {
        type: [String],
        enum: Object.values(Permissions),
        required: true,
        default: function (this: RoleDocument){
            return RolePermissions[this.name];
        },
    }

},
    { timestamps: true },
)

const RoleModel = mongoose.model<RoleDocument>('Member', roleSchema);
export default RoleModel;