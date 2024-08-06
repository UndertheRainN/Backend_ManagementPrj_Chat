import { OmitType } from '@nestjs/mapped-types';
import { Room } from '../entities/room.entity';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRoomInput extends OmitType(PartialType(Room), [
  'createdAt',
  'updatedAt',
] as const) {}
