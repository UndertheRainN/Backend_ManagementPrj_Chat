import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { RoomService } from 'src/room/room.service';
import { UpdateRoomInput } from 'src/room/dto/update-room.input';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly roomService: RoomService,
  ) {}

  @SubscribeMessage('push-message')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messagesService.create(createMessageDto);
    this.server.emit('message', message);
  }
  @SubscribeMessage('join')
  joinRoom(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @SubscribeMessage('update-room')
  async createRoom(@MessageBody() updateRoom: UpdateRoomInput) {
    const room = await this.roomService.update(updateRoom._id, updateRoom);
    this.server.emit('update-room-result', room);
  }
}
