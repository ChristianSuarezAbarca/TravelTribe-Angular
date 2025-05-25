import { Travel } from "./travel";
import { User } from "./user";

export interface TokenResponse {
    accessToken: string;
}

export interface SingleUserResponse {
    user: User;
}

export interface TravelsResponse {
    travels: Travel[];
}