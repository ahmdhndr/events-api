import type { Response } from "express";
import type { FilterQuery } from "mongoose";

import type { TEvent } from "@/db/schemas/event.schema";
import type { IReqUser } from "@/shared/types/auth";

import { events } from "@/db/schemas";
import { eventDAO } from "@/db/schemas/event.schema";
import { handleError } from "@/lib/handle-error";
import { AppError } from "@/utils/app-error";

export async function createEvent(req: IReqUser, res: Response) {
  try {
    const payload = { ...req.body, createdBy: req.user?.id } as TEvent;
    await eventDAO.validate(payload);
    const event = await events.create(payload);

    res.status(201).json({
      status: "success",
      message: `Event ${req.body.name} successfully created`,
      data: event,
    });
  }
  catch (error) {
    handleError(error, res);
  }
}

export async function getEvents(req: IReqUser, res: Response) {
  const { page = 1, limit = 10, search } = req.query as unknown as {
    page: number;
    limit: number;
    search?: string;
  };

  try {
    const query: FilterQuery<TEvent> = {};

    if (search) {
      Object.assign(query, {
        ...query,
        $text: {
          $search: search,
        },
      });
    }

    const results = await events
      .find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec();
    const count = await events.countDocuments(query);

    res.json({
      status: "success",
      message: "Events fetched",
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

export async function getEvent(req: IReqUser, res: Response) {
  try {
    const { id } = req.params;
    const result = await events.findById(id);
    if (!result) {
      throw new AppError("Event not found", 404);
    }

    res.json({
      status: "success",
      message: "Event fetched",
      data: result,
    });
  }
  catch (error) {
    handleError(error, res);
  }
}

export async function getEventBySlug(req: IReqUser, res: Response) {
  try {
    const { slug } = req.params;
    const result = await events.findOne({ slug }).exec();
    if (!result) {
      throw new AppError("Event not found", 404);
    }

    res.json({
      status: "success",
      message: "Event fetched",
      data: result,
    });
  }
  catch (error) {
    handleError(error, res);
  }
}

export async function updateEvent(req: IReqUser, res: Response) {
  try {
    const { id } = req.params;
    const updatedEvent = await events.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEvent) {
      throw new AppError("Event not found", 404);
    }

    res.json({
      status: "success",
      message: "Event updated",
      data: updatedEvent,
    });
  }
  catch (error) {
    handleError(error, res);
  }
}

export async function removeEvent(req: IReqUser, res: Response) {
  try {
    const { id } = req.params;
    const deletedEvent = await events.findByIdAndDelete(id, { new: true });
    if (!deletedEvent) {
      throw new AppError("Event not found", 404);
    }

    res.json({
      status: "success",
      message: "Event deleted",
      data: deletedEvent.name,
    });
  }
  catch (error) {
    handleError(error, res);
  }
}
