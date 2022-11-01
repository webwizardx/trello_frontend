import { AxiosError, AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '../../../src/api/auth';
import { withSessionRoute } from '../../../src/features/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const API_TOKEN = req.session.API_TOKEN;
		const config: AxiosRequestConfig = {
			headers: {
				Authorization: `Bearer ${API_TOKEN}`,
			},
		};
		const {
			data,
			data: { data: user },
			status,
		} = await getUser(config);

		res.status(status).json({
			...data,
			data: {
				user,
				API_TOKEN,
			},
		});
	} catch (error) {
		const { response } = error as AxiosError;
		res.status(response!.status).json(response!.data);
	}
};

export default withSessionRoute(handler);

