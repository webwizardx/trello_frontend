import { AxiosError, AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { logout, withSessionRoute } from '../../src/features/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const API_TOKEN = req.session.API_TOKEN;
		const config: AxiosRequestConfig = {
			headers: {
				Authorization: `Bearer ${API_TOKEN}`,
			},
		};
		const { data, status } = await logout(config);
		req.session.destroy();

		res.status(status).json(data);
	} catch (error) {
		req.session.destroy();
		if (error instanceof AxiosError) {
			const { response } = error as AxiosError;
			res.status(response!.status).json(response!.data);
		} else {
			res.status(500).json({
				message: 'Sorry, something went wrong in the server.',
			});
		}
	}
};

export default withSessionRoute(handler);

