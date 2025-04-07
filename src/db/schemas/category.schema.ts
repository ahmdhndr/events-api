import mongoose, { Schema } from "mongoose";
import * as Yup from "yup";

export const categoryDAO = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  icon: Yup.string().required("Icon is required"),
});

export type Category = Yup.InferType<typeof categoryDAO>;

const CategorySchema = new Schema<Category>({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  icon: {
    type: Schema.Types.String,
    required: true,
  },
}, {
  timestamps: true,
});

const CategoryModel = mongoose.model("Category", CategorySchema);

export default CategoryModel;
