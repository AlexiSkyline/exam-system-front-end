import { User } from './User';

export interface LoginResponse {
    timeStamp: string,
    httpCode: number,
    httpStatus: string,
    message: string,
    data: {
        userDetails: User,
        accessToken: string
    }
}

export interface LoginResponseException {
    timeStamp: string;
    httpCode: number;
    httpStatus: string;
    information: any;
}