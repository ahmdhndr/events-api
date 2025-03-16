import type { Request, Response } from "express";

import * as yup from "yup";

import type { IReqUser } from "@/middlewares/auth-middleware";

import { users } from "@/db/schemas";
import { generateToken } from "@/lib/jwt";
import { AppError } from "@/utils/app-error";
import { emailRegex } from "@/utils/email-regex";
import encrypt from "@/utils/encrypt";

const registerSchema = yup.object({
  identifier: yup.string().when("isLogin", (isLogin, schema) => isLogin ? schema.optional() : schema.required()),
  fullName: yup.string().when("isLogin", (isLogin, schema) => isLogin ? schema.optional() : schema.required()),
  username: yup.string().when("isLogin", (isLogin, schema) => isLogin ? schema.optional() : schema.required()),
  email: yup.string().matches(emailRegex, "Must be a valid email!").when("isLogin", (isLogin, schema) => isLogin ? schema.optional() : schema.required()),
  password: yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[@$!%*?&]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), ""], "Password not matched!").when("isLogin", (isLogin, schema) => isLogin ? schema.optional() : schema.required()),
  isLogin: yup.boolean().default(false),
});

export async function register(req: Request, res: Response) {
  try {
    const { fullName, username, email, password } = await registerSchema.validate({ ...req.body, isLogin: false });

    const existingUser = await users.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new AppError("Email or username already taken.", 409);
    }

    const createdUser = await users.create({
      fullName,
      username,
      email,
      password,
    });

    res.status(201).json({
      status: "success",
      message: "user created",
      data: createdUser.toObject({
        transform: (_, ret) => ({
          _id: ret._id,
          fullName: ret.fullName,
          username: ret.username,
          email: ret.email,
        }),
      }),
    });
  }
  catch (error) {
    let statusCode = 500;
    let status = "error";
    let message = "Internal Server Error";

    if (error instanceof AppError) {
      statusCode = error.statusCode;
      status = "failed";
      message = error.message;
    }
    else if (error instanceof yup.ValidationError) {
      statusCode = 400;
      status = "failed";
      message = error.message;
    }

    res.status(statusCode).json({
      status,
      message,
      data: null,
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { identifier, password } = await registerSchema.validate({ ...req.body, isLogin: true });

    const userByIdentifier = await users.findOne({ $or: [{ email: identifier }, { username: identifier }], isActive: true });
    if (!userByIdentifier) {
      throw new AppError("User not found.", 404);
    }

    const validatePassword: boolean = encrypt(password) === userByIdentifier?.password;
    if (!validatePassword) {
      throw new AppError("Wrong identifier or password.", 403);
    }

    const token = generateToken({
      id: userByIdentifier._id,
      role: userByIdentifier.role,
    });

    if (!token) {
      throw new AppError("Unauthorized", 403);
    }

    res.json({
      status: "success",
      message: "OK",
      data: {
        token,
      },
    });
  }
  catch (error) {
    let statusCode = 500;
    let status = "error";
    let message = "Internal Server Error";

    if (error instanceof AppError) {
      statusCode = error.statusCode;
      status = "failed";
      message = error.message;
    }
    else if (error instanceof yup.ValidationError) {
      statusCode = 400;
      status = "failed";
      message = error.message;
    }

    res.status(statusCode).json({
      status,
      message,
      data: null,
    });
  }
}

export async function me(req: IReqUser, res: Response) {
  try {
    const loggedInUser = req.user;
    const user = await users.findById(loggedInUser?.id);

    res.json({
      status: "success",
      message: "OK",
      data: { user },
    });
  }
  catch (error) {
    let statusCode = 500;
    let status = "error";
    let message = "Internal Server Error";

    if (error instanceof AppError) {
      statusCode = error.statusCode;
      status = "failed";
      message = error.message;
    }
    else if (error instanceof yup.ValidationError) {
      statusCode = 400;
      status = "failed";
      message = error.message;
    }

    res.status(statusCode).json({
      status,
      message,
      data: null,
    });
  }
}

export async function activation(req: Request, res: Response) {
  try {
    const { code } = req.body;

    const user = await users.findOneAndUpdate({
      activationCode: code,
    }, { isActive: true }, { new: true });

    res.json({
      status: "success",
      message: "user successfully activated",
      data: { user },
    });
  }
  catch (error) {
    let statusCode = 500;
    let status = "error";
    let message = "Internal Server Error";

    if (error instanceof AppError) {
      statusCode = error.statusCode;
      status = "failed";
      message = error.message;
    }
    else if (error instanceof yup.ValidationError) {
      statusCode = 400;
      status = "failed";
      message = error.message;
    }

    res.status(statusCode).json({
      status,
      message,
      data: null,
    });
  }
}
