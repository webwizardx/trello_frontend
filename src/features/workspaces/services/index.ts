import { AxiosRequestConfig } from 'axios';
import { api } from '../../../services';
import { ApiResponse } from '../../../services';
import { CreateWorkspaceDto, UpdateWorkspaceDto, Workspace } from './interface';

export const getWorkspace = async (
	id: number,
	config: AxiosRequestConfig = {}
) => {
	return await api.get<ApiResponse<Workspace>>(
		`/api/v1/workspaces/${id}`,
		config
	);
};

export const getWorkspaces = async (config: AxiosRequestConfig = {}) => {
	return await api.get<ApiResponse<Workspace[]>>(
		'/api/v1/workspaces',
		config
	);
};

export const createWorkspace = async (body: CreateWorkspaceDto) => {
	return await api.post<ApiResponse<Workspace>>('/api/v1/workspaces', body);
};

export const updateWorkspace = async (id: number, body: UpdateWorkspaceDto) => {
	return await api.patch<ApiResponse<Workspace>>(
		`/api/v1/workspaces/${id}`,
		body
	);
};

export const deleteWorkspace = async (
	id: number,
	config: AxiosRequestConfig = {}
) => {
	return await api.delete<ApiResponse<Workspace>>(
		`/api/v1/workspaces/${id}`,
		config
	);
};

