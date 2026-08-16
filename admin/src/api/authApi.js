import api from "./axios";

export const Login = async (userData) => {
    const response = await api.post("auth/login", userData); 
    return response.data;
}
