import { AxiosRequestConfig } from 'axios';
import { api } from '../../../services';
import { apiNextJs } from '../../../services/api';
import { ApiResponse } from '../../../services/interface';
import {
	LoginDto,
	CreateUserDto,
	User,
	Login,
	UserAndApiToken,
} from './interface';

export const getUser = async (config: AxiosRequestConfig = {}) => {
	return await api.get<ApiResponse<User>>('/api/v1/user', config);
};

export const getUserNextJs = async () => {
	return await apiNextJs.get<ApiResponse<UserAndApiToken>>('/api/user');
};

export const createUser = async (user: CreateUserDto) => {
	return await api.post<ApiResponse<User>>('/api/v1/auth/signup', user);
};

export const login = async (body: LoginDto) => {
	return await api.post<ApiResponse<Login>>('/api/v1/auth/login', body);
};

export const loginNextJs = async (body: LoginDto) => {
	return await apiNextJs.post<ApiResponse<Login>>('/api/login', body);
};

export const logout = async (config: AxiosRequestConfig = {}) => {
	return await api.get<ApiResponse>('/api/v1/auth/logout', config);
};

export const logoutNextJs = async () => {
	return await apiNextJs.get<ApiResponse>('/api/logout');
};

