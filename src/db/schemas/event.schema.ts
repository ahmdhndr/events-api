import type { ObjectId } from "mongoose";

import mongoose, { Schema } from "mongoose";
import * as Yup from "yup";

export const eventDAO = Yup.object({
  name: Yup.string().required("Name is required"),
  startDate: Yup.string().required("Start Date is required"),
  endDate: Yup.string().required("End Date is required"),
  banner: Yup.string().required("Banner is required"),
  description: Yup.string().required("Description is required"),
  isFeatured: Yup.boolean().required(),
  isOnline: Yup.boolean().required(),
  isPublished: Yup.boolean(),
  category: Yup.string().required("Category is required"),
  slug: Yup.string(),
  createdBy: Yup.string().required(),
  createdAt: Yup.string(),
  updatedAt: Yup.string(),
  location: Yup.object().required("Location is required"),
});

export type TEvent = Yup.InferType<typeof eventDAO>;

export interface IEvent extends Omit<TEvent, "category" | "createdBy"> {
  category: ObjectId;
  createdBy: ObjectId;
}

const EventSchema = new Schema<IEvent>({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  startDate: {
    type: Schema.Types.String,
    required: true,
  },
  endDate: {
    type: Schema.Types.String,
    required: true,
  },
  banner: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  isFeatured: {
    type: Schema.Types.Boolean,
    required: true,
  },
  isOnline: {
    type: Schema.Types.Boolean,
    required: true,
  },
  isPublished: {
    type: Schema.Types.Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  slug: {
    type: Schema.Types.String,
    unique: true,
  },
  location: {
    type: {
      region: {
        type: Schema.Types.Number,
      },
      coordinates: {
        type: [Schema.Types.Number],
        default: [-6.902459, 107.618730],
      },
    },
  },
}, {
  timestamps: true,
});

EventSchema.pre("save", function () {
  if (!this.slug) {
    const slug = this.name.split(" ").join("-").toLowerCase();
    this.slug = slug;
  }
});

const EventModel = mongoose.model("Event", EventSchema);

export default EventModel;
