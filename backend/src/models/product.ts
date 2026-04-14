import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string; //уникальное поле
  image: { fileName: string; originalName: string };
  category: string;
  description?: string; // необязательное поле
  price?: number | null;
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true, unique: true }, //уникальное поле
  image: {
    fileName: { type: String, required: true },
    originalName: { type: String, required: true }
  },
  category: { type: String, required: true },
  description: { type: String }, // необязательное поле
  price: { type: Number, default: null },
});

export default mongoose.model<IProduct>('product', productSchema);