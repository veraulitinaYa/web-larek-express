import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  title: string; //уникальное поле
  image: { fileName: string; originalName: string };
  category: string;
  description?: string; // необязательное поле
  price: number | null;
}


