export type ApiResponse<T = any> = {
	datetime: string;
	timestamp: string;
	ip: string;
	statusCode: number;
	message: string;
	data: T;
};
