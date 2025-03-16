import mongoose, { Schema } from "mongoose";

import type { IUser } from "@/shared/types/user";

import env from "@/env";
import { renderMailHtml, sendMail } from "@/lib/mail";
import encrypt from "@/utils/encrypt";
import { generateActivationCode } from "@/utils/generate-activation-code";
import { log } from "@/utils/log";

const UserSchema = new Schema<IUser>({
  fullName: {
    type: Schema.Types.String,
    required: true,
  },
  username: {
    type: Schema.Types.String,
    unique: true,
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
  user.password = encrypt(user.password);
  const activationCode = generateActivationCode();
  user.activationCode = encrypt(activationCode);
});

UserSchema.post("save", async (doc, next) => {
  try {
    const user = doc;

    log.info({ email: user.email }, "Send email activation");

    const mailContent = await renderMailHtml("registration-success.ejs", {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
      activationLink: `${env.CLIENT_HOST}/auth/activation?code=${user.activationCode}`,
    });

    await sendMail({
      from: "ACARA <no-reply@kjsr.or.id>",
      to: user.email,
      subject: "Aktifasi Akun - ACARA",
      html: mailContent,
    });
  }
  catch (error) {
    log.error({ err: error }, "Error sending activation email");
  }
  finally {
    next();
  }
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
