import axios from "axios";
import { useAuthProvider } from "./use-auth-provider";

export const useApi = () => {
	const { token } = useAuthProvider();
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
