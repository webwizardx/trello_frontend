import { MessageParams } from 'yup/lib/types';

export const getRequiredMessage = (messageParams: MessageParams) =>
	`The field '${messageParams.path}' is required.`;

