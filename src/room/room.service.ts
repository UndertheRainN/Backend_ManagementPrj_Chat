import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Room } from './entities/room.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PinoLogger } from 'nestjs-pino';
import { FindRoomInput } from './dto/find-room.input';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    private readonly logger: PinoLogger,
  ) {
    this.logger.info(RoomService.name);
  }

  create(createRoomInput: CreateRoomInput) {
    try {
      this.logger.info('RoomService#create %o', createRoomInput);
      const createModel = new this.roomModel(createRoomInput);
      const result = createModel.save();
      this.logger.info('RoomService#create.result %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#create. %o', error);
      throw new BadRequestException(
        'Lỗi tạo tài khoản, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  findAll(find: FindRoomInput) {
    return this.roomModel
      .find(
        { 'users._id': find.idUser },
        {},
        { skip: find.page || 0, limit: 30 },
      )
      .sort({ updatedAt: -1 })
      .exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} room`;
  }

  async update(id: string, updateRoomInput: UpdateRoomInput) {
    try {
      this.logger.info('RoomService#update %o', id);
      const result = await this.roomModel.findByIdAndUpdate(
        id,
        updateRoomInput,
        { new: true },
      );
      this.logger.info('RoomService#update.result %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#update. %o', error);
      throw new BadRequestException(
        'Lỗi tạo tài khoản, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  remove(_id: number) {
    try {
      this.logger.info('RoomService#remove %o', _id);
      const result = this.roomModel.deleteOne({ _id });
      this.logger.info('RoomService#remove.result %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#remove. %o', error);
      throw new BadRequestException(
        'Lỗi tạo tài khoản, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }
}
