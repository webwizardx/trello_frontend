import { setupServer } from 'msw/node';
import { authHandlers } from '../features/auth';
import { workspaceHandlers } from '../features/workspaces';

export const server = setupServer(...authHandlers, ...workspaceHandlers);

