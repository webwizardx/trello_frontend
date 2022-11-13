import { rest } from 'msw';

export const loginSuccessHandler = rest.post('/api/login', (_, res, ctx) => {
	const body = {
		message: 'Login successfully',
		data: {
			apiToken: 'API_TOKEN',
		},
	};
	return res(ctx.status(201), ctx.json(body));
});
export const signupSuccessHandler = rest.post(
	`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/auth/signup`,
	(_, res, ctx) => {
		const body = {
			message: 'Signup successfully',
		};
		return res(ctx.status(201), ctx.json(body));
	}
);

export const getUserHandler = rest.get('/api/user', (_, res, ctx) => {
	const body = {
		data: {
			id: 1,
			name: 'John',
			last_name: 'Doe',
			email: 'john@doe.com',
			username: 'johndoe',
			API_TOKEN: 'API_TOKEN',
		},
	};
	return res(ctx.status(200), ctx.json(body));
});

const handlers = [loginSuccessHandler, signupSuccessHandler, getUserHandler];

export default handlers;

