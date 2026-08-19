import api from "./axios";

export const getfood = async () => {
    const response = await api.get("/foods");
    return response.data;
}

export const addFood = async (foodData) => {
    const response = await api.post("/admin/addFood",foodData,{
        headers: {
            contentType: "multipart/form-data"
        }
    })

    return response.data;
}

export const deleteFood = async (foodId) => {
    const response = await api.delete(`/admin/deleteFood/${foodId}`);
    return response.data;
}

export const updateFood = async (foodId, foodData) => {
    const response = await api.put(`/admin/updateFood/${foodId}`, foodData, {
        headers: {
            contentType: "multipart/form-data"
        }
    });
    return response.data;
};
