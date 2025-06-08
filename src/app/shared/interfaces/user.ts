export interface User {
    _id?: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    number: string;
    rol: string
    avatar?: string;
    // travelInteractions,
    // ratedTravels,
    // commentedTravels,
    // conversations,
    me?: boolean;
}

export interface UserLogin {
    usernameOrEmail: string;
    password: string;
}

// export interface UserProfileEdit {
//     name: string;
//     email: string;
// }

// export interface UserPhotoEdit {
//     avatar: string;
// }

// export interface UserPasswordEdit {
//     password: string;
// }
