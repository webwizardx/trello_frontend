import { User } from '../../../auth';

export type CreateWorkspaceDto = {
	title: string;
	user_id: number;
};

export type UpdateWorkspaceDto = Partial<CreateWorkspaceDto>;

export type Workspace = {
	id: number;
	user_id?: number;
	user?: User;
	boards?: Board[];
} & Omit<CreateWorkspaceDto, 'user_id'>;

export type Board = {
	id: number;
	title: string;
	workspace_id?: number;
	workspace?: Workspace;
};

