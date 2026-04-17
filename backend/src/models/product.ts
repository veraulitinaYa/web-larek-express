import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  image: { fileName: string; originalName: string };
  category: string;
  description?: string;
  price?: number | null;
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Поле title обязательно'],
    unique: true,
    minlength: [2, 'Минимум 2 символа'],
    maxlength: [30, 'Максимум 30 символов'],
  },

  image: {
    fileName: { type: String, required: true },
    originalName: { type: String, required: true },
  },

  category: {
    type: String,
    required: [true, 'Поле category обязательно'],
  },

  description: {
    type: String,
    default: '',
  },

  price: {
    type: Number,
    default: null,
  },
});

export default mongoose.model<IProduct>('product', productSchema);
