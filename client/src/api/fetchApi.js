import axios from 'axios';

// this creates an fetch request 
export const API = async ()=>{
    const res = await axios.create({
        baseURL:"http://localhost:8000/api"
    })
    return res
}

export default API;

