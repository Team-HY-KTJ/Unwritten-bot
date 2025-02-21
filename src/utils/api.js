import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.BACKEND_API_URL ? `${process.env.BACKEND_API_URL}:3000` : 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function checkUserExists(userId) {
    try {
        const response = await apiClient.get('/user', { params: { userId } });
        return response.data.exists;
    } catch (error) {
        console.error('Error checking user:', error);
        throw error;
    }
}

export async function addUser(userId, nickname) {
    try {
        const response = await apiClient.post('/user', { userId, nickname });
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
} 