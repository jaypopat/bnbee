export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    guestRating: number | null;
    ownerRating: number | null;
    role: "user" | "admin";
}