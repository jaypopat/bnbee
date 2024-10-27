import api from "./index";
import {isAxiosError} from "axios";
import {UserProfile} from "@/types";

async function getUser(): Promise<UserProfile> {
    return api.get('/me')
        .then(response => {
            return response.data
        });
}


async function updateUser(userId: number, data: UserProfile): Promise<UserProfile> {
    try {
        const updated_user = await api.put(`/api/users/${userId}`, data);
        console.log(updated_user.data);
        return updated_user.data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.error('Error updating user:', {
                status: error.response?.status,
                data: error.response?.data,
            });
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}

export {
    getUser,
    updateUser
}
