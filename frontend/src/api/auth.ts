import api from "./index";

const PREFIX = "Bearer ";

async function getAuthToken(email: string, password: string): Promise<string | null> {
    try {
        const response = await api.post('/login', {email, password});
        const token = response.headers["authorization"]?.replace(PREFIX, '');
        if (!token) {
            console.error('No authorization token received from server');
            return null;
        }
        return token;
    } catch (error) {
        console.error('Error getting auth token:', error);
        throw error;
    }
}

function setAuthToken(auth_token?: string): void {
    if (!auth_token) {
        localStorage.removeItem("authToken");
        delete api.defaults.headers.common['Authorization'];
    } else {
        localStorage.setItem("authToken", auth_token);
        api.defaults.headers.common['Authorization'] = PREFIX + auth_token;
    }
}

export {
    getAuthToken, setAuthToken
};
