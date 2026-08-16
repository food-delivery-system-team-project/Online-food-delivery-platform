import axios from "axios";

export const getProfile = async () =>{
    const response = await axios.get("/api/profile");
    return response.data;
}

export const updatateProfile = async (formData) =>{
    const response = await axios.put("/api/profile", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
}