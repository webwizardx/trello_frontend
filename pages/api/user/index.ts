import { AxiosError, AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
	getUser,
	UserAndApiToken,
	withSessionRoute,
} from '../../../src/features/auth';

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
				...user,
				API_TOKEN,
			} as UserAndApiToken,
		});
	} catch (error) {
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

