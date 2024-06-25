import * as Jose from 'jose';

declare global {
	interface Window {
		Hls: any;
	}

	namespace App {
		interface Error {
			code: string;
			message: string;
		}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace Auth {
		interface Error {
			code: string;
			message: string;
		}
		interface UserPayload {
			_id: string;
			role: 'admin' | 'guest' | string;
			permissions: any;
			name: string;
		}
		interface JWTPayload extends Jose.JWTPayload {
			user: UserPayload;
		}
	}
}

export {};
