import type { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import { login, withSessionRoute } from '../../src/features/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { data, status } = await login(req.body);

		req.session.API_TOKEN = data.data.apiToken;
		req.session.user = { ...data.data.user };
		await req.session.save();

		res.status(status).json(data);
	} catch (error: any) {
		if (error instanceof AxiosError) {
			const { response } = error;
			res.status(response!.status).json(response!.data);
		} else {
			res.status(500).json({
				message: 'Sorry, something went wrong in the server.',
			});
		}
	}
};

export default withSessionRoute(handler);

