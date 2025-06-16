export interface User {
    _id?: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    number: string;
    rol: string
    avatar?: string;
    travelInteractions?: [{
        travel: string,
        type: string
    }],
    banned: boolean
}

export interface UserLogin {
    usernameOrEmail: string;
    password: string;
}
