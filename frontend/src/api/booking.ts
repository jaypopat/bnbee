import api from "@/api/index.ts";
import { Booking } from "@/pages/Booking/Bookings.tsx";
import { AxiosError } from 'axios';

async function getBookingsForUser(userId: number): Promise<Booking[]> {
    try {
        const response = await api.get(`/api/bookings/users/${userId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Error fetching bookings:', error.response?.status, error.response?.data);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}

export {
    getBookingsForUser
}
