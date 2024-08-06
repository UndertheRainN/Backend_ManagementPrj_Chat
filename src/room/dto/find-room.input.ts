import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindRoomInput {
  @Field(() => String)
  idUser: string;
  @Field({ defaultValue: 0, nullable: true })
  page: number;
}
