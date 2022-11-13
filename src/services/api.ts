import axios from 'axios';
import { getUserNextJs } from '../features/auth';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_HOST as string,
	headers: {
		Accept: 'application/json',
	},
	withCredentials: true,
	xsrfHeaderName: 'X-XSRF-TOKEN',
});

api.interceptors.request.use(async config => {
	const publicUrls = [
		'/api/v1/auth/login',
		'/api/v1/auth/signup',
		'/api/v1/auth/logout',
		'/api/v1/user',
	];

	if (publicUrls.includes(config.url ?? '')) return config;

	const {
		data: { data },
	} = await getUserNextJs();

	if (data.API_TOKEN) {
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${data.API_TOKEN}`,
		};
	}

	return config;
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

