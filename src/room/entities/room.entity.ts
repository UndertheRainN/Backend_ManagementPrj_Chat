import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@ObjectType('Object_user_chat')
@InputType('Input_user_chat')
export class User {
  @Field()
  _id: string;
  @Field({ defaultValue: false })
  mute: boolean;
}

@ObjectType()
@Schema({ autoIndex: true, timestamps: true })
export class Room {
  @Field()
  // @PrimaryGeneratedColumn()
  _id?: string;

  @Field(() => [User], { nullable: true })
  @Prop({
    raw: [{ _id: { type: mongoose.Types.ObjectId }, mute: { type: Boolean } }],
  })
  users: User[];
  @Field({ nullable: true })
  @Prop()
  name: string;
  @Field({ nullable: true })
  @Prop()
  avatar?: string;
  @Field({ nullable: true })
  @Prop()
  lastComment?: string;
  @Field()
  createdAt?: Date;
  @Field()
  updatedAt?: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
export type RoomDocument = HydratedDocument<Room>;
