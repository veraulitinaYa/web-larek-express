import mongoose, { Schema } from "mongoose";
import { IProduct } from "./types";


const productSchema = new Schema<IProduct>({
  title: { type: String, required: true, unique: true }, //уникальное поле
  image: {
    fileName: { type: String, required: true },
    originalName: { type: String, required: true }
  },
  category: { type: String, required: true },
  description: { type: String }, // необязательное поле
  price: { type: Number, required: true },
});

export default mongoose.model<IProduct>('product', productSchema); 