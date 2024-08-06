import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

interface IMessage {
  _id: string;
  text: string;
  type: string;
  userId: string;
}

@Schema({ autoIndex: true })
export class Message {
  @Prop()
  type: string;
  @Prop()
  page: number;
  @Prop()
  count: number;
  @Prop({
    raw: [
      {
        text: String,
        _id: mongoose.Types.ObjectId,
        type: String,
        userId: mongoose.Types.ObjectId,
      },
    ],
  })
  messages: IMessage[];
  @Prop(() => mongoose.Types.ObjectId)
  roomId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export type MessageDocument = HydratedDocument<Message>;
