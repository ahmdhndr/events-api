import mongoose, { Schema } from "mongoose";

import type { IUser } from "@/shared/types/user";

import encryptPassword from "@/utils/encrypt-password";

const UserSchema = new Schema<IUser>({
  fullName: {
    type: Schema.Types.String,
    required: true,
  },
  username: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  role: {
    type: Schema.Types.String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  avatar: {
    type: Schema.Types.String,
    default: null,
  },
  isActive: {
    type: Schema.Types.Boolean,
    default: false,
  },
  activationCode: {
    type: Schema.Types.String,
  },
}, {
  timestamps: true,
});

UserSchema.pre("save", function () {
  // eslint-disable-next-line ts/no-this-alias
  const user = this;
  user.password = encryptPassword(user.password);
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
