import type { Response } from "express";

import type { IReqUser } from "@/shared/types/auth";

import { categories } from "@/db/schemas";
import { categoryDAO } from "@/db/schemas/category.schema";
import { handleError } from "@/lib/handle-error";
import { AppError } from "@/utils/app-error";

export async function create(req: IReqUser, res: Response) {
  try {
    await categoryDAO.validate(req.body);
    const result = await categories.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Category created",
      data: result,
    });
  }
  catch (error) {
    handleError(error, res);
  }
}

export async function findAll(req: IReqUser, res: Response) {
  const { page = 1, limit = 10, search } = req.query as unknown as {
    page: number;
    limit: number;
    search?: string;
  };

  try {
    const query = {};

    if (search) {
      Object.assign(query, {
        $or: [
          {
            name: { $regex: search, $options: "i" },
          },
          {
            description: { $regex: search, $options: "i" },
          },
        ],
      });
    }

    const results = await categories
      .find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec();
    const count = await categories.countDocuments(query);

    res.json({
      status: "success",
      message: "Categories fetched",
      data: {
        list: results,
        total: count,
        totalPages: Math.ceil(count / limit),
        current: page,
      },
    });
  }
  catch (error) {
    handleError(error, res);
  }
}

export async function findOne(req: IReqUser, res: Response) {
  try {
    const { id } = req.params;
    const result = await categories.findById(id);

    res.json({
      status: "success",
      message: "Category fetched",
      data: result,
    });
  }
  catch (error) {
    handleError(error, res);
  }
}

export async function update(req: IReqUser, res: Response) {
  try {
    const { id } = req.params;
    const updatedCategory = await categories.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCategory) {
      throw new AppError("Category not found", 404);
    }

    res.json({
      status: "success",
      message: "Category updated",
      data: updatedCategory,
    });
  }
  catch (error) {
    handleError(error, res);
  }
}

export async function remove(req: IReqUser, res: Response) {
  try {
    const { id } = req.params;
    const deletedCategory = await categories.findByIdAndDelete(id, { new: true });
    if (!deletedCategory) {
      throw new AppError("Category not found", 404);
    }

    res.json({
      status: "success",
      message: "Category deleted",
      data: deletedCategory.name,
    });
  }
  catch (error) {
    handleError(error, res);
  }
}
