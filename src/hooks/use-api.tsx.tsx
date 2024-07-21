import axios from "axios";

export const useApi = () => {
    const token = sessionStorage.getItem("fbtoken");
    const hasToken = token !== null;
    const api = axios.create({
        baseURL: `${import.meta.env.VITE_BaseURL}/api`,
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "X-token": token,
        },
    });
    return { api, hasToken };
};

