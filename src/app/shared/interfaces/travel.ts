import { User } from "./user";

export interface TravelInsert {
	title: string;
	description: string;
	maxPeople: number,
	minAge: number,
	temperature: string,
	images: string[],
	likes: number,
	rate: number,
	difficulty: string,
	category: string,
	keywords?: string[],
	activities: string[],
	location: {
		country: string,
        city: string,
        coordinates: {
            lat: number,
            lng: number
        }
	},
	price: {
        adultPrice: number,
        childPrice: number,
        finalPrice: number
    },
    date: {
        startDate: Date,
        endDate: Date
    },
    numberOfPersons:{
        adults: number,
        childs: number,
    },
    logistics: {
        transport: string,
        hotel: string
    },
    include: {
        includes: string[],
        notIncludes: string[]
    }
}

export interface Travel extends TravelInsert {
	id: number;
	creator: User;
	mine: boolean;
}

export interface Comment {
    id: number;
    text: string;
    date: Date;
    user: User;
}