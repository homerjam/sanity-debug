import { SignJWT, jwtVerify } from 'jose';
import groq from 'groq';
import { error } from '@sveltejs/kit';
import {
	kindeAuthClient,
	type SessionManager,
	type UserType,
} from '@kinde-oss/kinde-auth-sveltekit';
import { client } from '$lib/sanity-client';
import { env } from '$env/dynamic/private';

const defaultPermissions = {};

export const signJwt = async (
	payload = {},
	{ expiresAt = undefined }: { expiresAt?: Date | string } = {}
) => {
	const jwt = new SignJWT(payload).setProtectedHeader({ alg: 'HS256' });

	if (expiresAt !== undefined) {
		jwt.setExpirationTime(expiresAt || -1);
	}

	return jwt.sign(new TextEncoder().encode(env.AUTH_SECRET));
};

export const verifyJwt = async (jwt = '') => {
	const { payload } = await jwtVerify(jwt, new TextEncoder().encode(env.AUTH_SECRET));
	return payload as Auth.JWTPayload;
};

export const authenticate = async ({ request }: { request: Request }) => {
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	);
	let user: any | undefined;
	let userProfile: UserType | undefined;
	let userPayload: Auth.UserPayload | undefined;
	let apiToken: string | undefined;

	if (isAuthenticated) {
		userProfile = await kindeAuthClient.getUser(request as unknown as SessionManager);

		// const userOrganizations = await kindeAuthClient.getUserOrganizations(
		// 	request as unknown as SessionManager
		// );

		// const permission = await kindeAuthClient.getPermission(
		// 	request as unknown as SessionManager,
		// 	'read:profile'
		// );

		// const permissions = await kindeAuthClient.getPermissions(request as unknown as SessionManager);

		// const aud = await kindeAuthClient.getClaim(request as unknown as SessionManager, 'aud');

		// try {
		// 	const theme = await kindeAuthClient.getStringFlag(
		// 		request as unknown as SessionManager,
		// 		'theme'
		// 	);
		// 	const is_dark_mode = await kindeAuthClient.getBooleanFlag(
		// 		request as unknown as SessionManager,
		// 		'is_dark_mode'
		// 	);
		// 	const user_limit = await kindeAuthClient.getIntegerFlag(
		// 		request as unknown as SessionManager,
		// 		'user_limit'
		// 	);
		// 	console.log({
		// 		theme,
		// 		is_dark_mode,
		// 		user_limit,
		// 	});
		// } catch (error) {
		// 	console.log(error);
		// }

		// console.log({
		// 	isAuthenticated,
		// 	userProfile,
		// 	// userOrganizations,
		// 	// permission,
		// 	// permissions,
		// 	// aud,
		// });

		user = await client.fetch(
			groq`*[_type == "user" && email == $email][0] { _id, role, permissions }`,
			{
				email: userProfile.email,
			}
		);

		if (!user) {
			error(401, { message: `User not found: ${userProfile.email}`, code: 'USER_NOT_FOUND' });
		}

		// console.log({ user });

		userPayload = {
			_id: user._id,
			role: user.role || 'guest',
			permissions: {
				...defaultPermissions,
				...user.permissions,
			},
			// email: user.email,
			name: userProfile.given_name || user.name || '',
		};

		apiToken = await signJwt(
			{
				user: userPayload,
			},
			{ expiresAt: new Date(Date.now() + 1000 * 60 * 60) }
		);
	}

	return {
		isAuthenticated,
		user: userPayload,
		apiToken,
	};
};
