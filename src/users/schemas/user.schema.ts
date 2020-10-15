import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
    @Prop({ required: true, unique: true, minlength: 4, maxlength: 20 })
    username!: string;

    @Prop({ required: true })
    password!: string;

    @Prop()
    salt!: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
