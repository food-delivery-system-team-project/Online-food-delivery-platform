import api from "./axios";

export const getfood = async () => {
    const response = await api.get("/foods");
    return response.data;
}

export const addFood = async (foodData) => {
    const response = await api.post("/foods",foodData,{
        headers: {
            contentType: "multipart/form-data"
        }
    })

    return response.data;
}

export const deleteFood = async (foodId) => {
    const response = await api.delete(`/admin/${foodId}`);
    return response.data;
}

