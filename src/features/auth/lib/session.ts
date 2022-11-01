import type { IronSessionOptions } from 'iron-session';
import { User } from '../../../api/auth/interface';

export const sessionOptions: IronSessionOptions = {
	password: process.env.SECRET_COOKIE_PASSWORD as string,
	cookieName: '_SESSION_',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
	interface IronSessionData {
		API_TOKEN?: string;
		user?: Omit<User, 'password'>;
	}
}

