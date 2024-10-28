import {UserProfile} from "@/types/user.ts";

export interface Property{
    address: string,
    country: string,
    createdAt: string,
    description: string,
    id: number,
    name: string,
    owner:UserProfile,
    pricePerNight: number,
    rating : number|null,
    type:AccommodationType
}

export type AccommodationType =
    "BNB" |
    "LODGE" |
    "BEACH_HOUSE" |
    "APARTMENT" |
    "TREE_HOUSE" |
    "CASTLE" |
    "VILLA" |
    "DUNGEON" |
    "MANSION" |
    "BARN";
