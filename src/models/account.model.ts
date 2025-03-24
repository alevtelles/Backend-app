import mongoose from "mongoose";
import { type Document, Schema } from "mongoose";
import { ProviderEneum, type ProviderEnumType } from "../enums/account-provider.enum";
import { object } from "zod";

export interface AccountDocument extends Document {
	provider: ProviderEnumType;
	providerId: string;
	userId: mongoose.Types.ObjectId;
	refreshToken: string | null;
	tokenExpiry: Date | null;
    createdAt: Date;

}

const accountSchema = new Schema<AccountDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    provider: {
        type: String,
        enum: Object.values(ProviderEneum),
        required: true,
    },
    providerId: {
        type: String, 
        required: true, 
        unique: true
    },
    refreshToken: {
        type: String,
        default: null,
    },
    tokenExpiry: {
        type: Date,
        default: null,
    }
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret){
                // biome-ignore lint/performance/noDelete: <explanation>
                delete ret.refreshToken
            },
        },
    }

);

const AccountModel = mongoose.model<AccountDocument>("Account", accountSchema);
export default AccountModel;