import axios from 'axios';

const api = axios.create({
	baseURL: process.env.API_HOST as string,
	headers: {
		Accept: 'application/json',
	},
	withCredentials: true,
	xsrfHeaderName: 'X-XSRF-TOKEN',
});

export const apiNextJs = axios.create({
	headers: {
		Accept: 'application/json',
	},
	withCredentials: true,
	xsrfHeaderName: 'X-XSRF-TOKEN',
});

export const getSanctumCsrfCookie = async () => {
	return await api.get('sanctum/csrf-cookie');
};

export default api;

