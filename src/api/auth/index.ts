import { AxiosRequestConfig } from 'axios';
import { api } from '..';
import { apiNextJs } from '../api';
import { Login, User } from './interface';

export const getUser = async (config: AxiosRequestConfig = {}) => {
	return await api.get('/api/v1/user', config);
};

export const getUserNextJs = async () => {
	return await apiNextJs.get('/api/user');
};

export const createUser = async (user: User) => {
	return await api.post('/api/v1/auth/signup', user);
};

export const login = async (body: Login) => {
	return await api.post('/api/v1/auth/login', body);
};

export const loginNextJs = async (body: Login) => {
	return await apiNextJs.post('/api/login', body);
};

export const logout = async (config: AxiosRequestConfig = {}) => {
	return await api.get('/api/v1/auth/logout', config);
};

export const logoutNextJs = async () => {
	return await apiNextJs.get('/api/logout');
};

