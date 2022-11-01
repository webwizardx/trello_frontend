import { AxiosError, AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { logout } from '../../src/api/auth';
import { withSessionRoute } from '../../src/features/auth';

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
		const { response } = error as AxiosError;
		req.session.destroy();
		res.status(response!.status).json(response!.data);
	}
};

export default withSessionRoute(handler);

