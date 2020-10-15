import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    price!: number;

    @Prop({ required: true })
    manufacturer!: string;

    @Prop({ required: true })
    categories!: string[];

    @Prop({ required: true })
    image!: string;

    @Prop({ required: true, default: true })
    inStock!: boolean;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
