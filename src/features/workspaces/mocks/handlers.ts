import { rest } from 'msw';

export const getWorkspaceHandler = rest.get(
	`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/workspaces/:id`,
	(_, res, ctx) => {
		const body = {
			message: 'OK',
			data: {
				id: 1,
				title: 'Workspace 1',
				user_id: 1,
				boards: [
					{
						id: 1,
						title: 'Board 1',
						workspace_id: 1,
					},
				],
			},
		};
		return res(ctx.status(200), ctx.json(body));
	}
);

export const getWorkspacesHandler = rest.get(
	`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/workspaces`,
	(_, res, ctx) => {
		const body = {
			message: 'OK',
			data: [
				{
					id: 1,
					title: 'Workspace 1',
					user_id: 1,
					boards: [
						{
							id: 1,
							title: 'Board 1',
							workspace_id: 1,
						},
					],
				},
				{
					id: 2,
					title: 'Workspace 2',
					user_id: 1,
					boards: [
						{
							id: 2,
							title: 'Board 2',
							workspace_id: 2,
						},
					],
				},
				{
					id: 3,
					title: 'Workspace 3',
					user_id: 1,
					boards: [
						{
							id: 3,
							title: 'Board 3',
							workspace_id: 3,
						},
					],
				},
			],
		};
		return res(ctx.status(200), ctx.json(body));
	}
);
export const createWorkspaceHandler = rest.post(
	`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/workspaces`,
	(_, res, ctx) => {
		const body = {
			message: 'OK',
			data: {
				id: 1,
				title: 'Workspace 1',
				user_id: 1,
			},
		};
		return res(ctx.status(200), ctx.json(body));
	}
);
export const updateWorkspaceHandler = rest.patch(
	`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/workspaces/:id`,
	(_, res, ctx) => {
		const body = {
			message: 'OK',
			data: {
				id: 1,
				title: 'Workspace 1',
				user_id: 1,
			},
		};
		return res(ctx.status(200), ctx.json(body));
	}
);
export const deleteWorkspaceHandler = rest.delete(
	`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/workspaces/:id`,
	(_, res, ctx) => {
		const body = {
			message: 'OK',
			data: {
				id: 1,
				title: 'Workspace 1',
				user_id: 1,
			},
		};
		return res(ctx.status(200), ctx.json(body));
	}
);
const handlers = [
	getWorkspaceHandler,
	getWorkspacesHandler,
	createWorkspaceHandler,
	updateWorkspaceHandler,
	deleteWorkspaceHandler,
];

export default handlers;

