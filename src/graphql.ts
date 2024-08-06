
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Input_user_chat {
    _id: string;
    mute: boolean;
}

export interface FindRoomInput {
    idUser: string;
    page?: Nullable<number>;
}

export interface CreateRoomInput {
    users?: Nullable<Input_user_chat[]>;
    name?: Nullable<string>;
    avatar?: Nullable<string>;
    lastComment?: Nullable<string>;
}

export interface Object_user_chat {
    _id: string;
    mute: boolean;
}

export interface Room {
    _id: string;
    users?: Nullable<Object_user_chat[]>;
    name?: Nullable<string>;
    avatar?: Nullable<string>;
    lastComment?: Nullable<string>;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface IQuery {
    rooms(find: FindRoomInput): Room[] | Promise<Room[]>;
    room(id: string): Room | Promise<Room>;
}

export interface IMutation {
    createRoom(createRoomInput: CreateRoomInput): Room | Promise<Room>;
    removeRoom(id: number): Room | Promise<Room>;
}

export type DateTime = any;
type Nullable<T> = T | null;
