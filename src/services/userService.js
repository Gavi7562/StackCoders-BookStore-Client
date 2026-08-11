import api from './api';

export const userService = {
    updateUsername: async (username) => {
        const response = await api.put('/users/profile/username', { username });
        return response.data;
    },

    updateEmail: async (email) => {
        const response = await api.put('/users/profile/email', { email });
        return response.data;
    },

    changePassword: async (currentPassword, newPassword, confirmPassword) => {
        const response = await api.put('/users/profile/password', {
            currentPassword,
            newPassword,
            confirmPassword
        });
        return response.data;
    }
};
