import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Room } from '../entities/room.entity';

@InputType()
export class CreateRoomInput extends OmitType(PartialType(Room, InputType), [
  '_id',
  'createdAt',
  'updatedAt',
] as const) {}
