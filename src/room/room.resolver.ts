import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { Room } from './entities/room.entity';
import { UpdateRoomInput } from './dto/update-room.input';
import { CreateRoomInput } from './dto/create-room.input';
import { FindRoomInput } from './dto/find-room.input';

@Resolver(() => Room)
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Mutation(() => Room)
  createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return this.roomService.create(createRoomInput);
  }

  @Query(() => [Room], { name: 'rooms' })
  findAll(@Args('find') find: FindRoomInput) {
    console.log(find, 'find');
    return this.roomService.findAll(find);
  }

  @Query(() => Room, { name: 'room' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.roomService.findOne(id);
  }

  @Mutation(() => Room)
  removeRoom(@Args('id', { type: () => Int }) id: number) {
    return this.roomService.remove(id);
  }
}
