import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	NextApiHandler,
} from 'next';
import { sessionOptions } from './session';

export function withSessionRoute(
	handler: NextApiHandler,
	options = sessionOptions
) {
	return withIronSessionApiRoute(handler, options);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
	P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
	handler: (
		context: GetServerSidePropsContext
	) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
	options = sessionOptions
) {
	return withIronSessionSsr(handler, options);
}
