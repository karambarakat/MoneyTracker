import { Document, Types } from "mongoose";

export interface IProfile extends IProfileSubDocument {
    _id: string
    token: string
    createdAt: string
    updatedAt: string
}

export interface IProfileSubDocument {
    displayName: string
    email: string
    picture?: string
}

export interface IGoogleSubDocument {
    accessToken: string
    refreshToken: string
    profile: any
}

export interface IUser {
    _id: string
    profile: IProfileSubDocument
    email: string
    provider: ('local' | 'google')[]
    googleInfo?: IGoogleSubDocument
    password?: string

    createdAt: string
    updatedAt: string

    getProfile: () => IProfile
    matchPasswords: (given: string) => boolean
}

export type IUserDocument = Document<unknown, any, IUser> & IUser & {
    _id: string;
}