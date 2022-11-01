import { login } from './../../src/api/auth/index';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import { withSessionRoute } from '../../src/features/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { data, status } = await login(req.body);

		req.session.API_TOKEN = data.data.apiToken;
		req.session.user = { ...data.data.user };
		await req.session.save();

		res.status(status).json(data);
	} catch (error: any) {
		const { response } = error as AxiosError;
		res.status(response!.status).json(response!.data);
	}
};

export default withSessionRoute(handler);

