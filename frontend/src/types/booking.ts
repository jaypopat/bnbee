import {UserProfile} from "@/types/user.ts";
import {Property} from "@/types/property.ts";

export interface Booking {
    id: number,
    booker: UserProfile
    property: Property,
    startDate: string,
    endDate: string,
    headCount: number,
    paymentAmount: number,
    status: "PENDING" | "CONFIRMED" | "CANCELLED" // booking dto status enum values
}