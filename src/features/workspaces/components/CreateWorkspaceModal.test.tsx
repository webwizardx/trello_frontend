import { render, screen, waitFor } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import CreateWorkspaceModal from './CreateWorkspaceModal';
import userEvent from '@testing-library/user-event';
import { Workspace } from '../services/interface';

describe('CreateWorkspaceModal component', () => {
    const onClose = jest.fn();

    it('shoud create a workspace', async () => {
        render(<CreateWorkspaceModal isOpen={true} onClose={onClose} />);
        const title = 'Create a workspace';
        const titleInput = await screen.findByLabelText('Title', { exact: false });
        const createButton = await screen.findByRole('button', { name: /Create/i });
        await screen.findByRole('dialog', { name: /Create Workspace/i });

        await userEvent.type(titleInput, title);
        await userEvent.click(createButton);

        await waitFor(() => expect(screen.getByRole('alertdialog', { name: /Success/i })).toBeInTheDocument());
    });

    it('shoud edit a workspace', async () => {
        const workspace: Workspace = {
            id: 1,
            title: 'Edit a workspace',
        }
        render(<CreateWorkspaceModal isOpen={true} onClose={onClose} workspace={workspace} />);
        const titleInput = await screen.findByLabelText('Title', { exact: false });
        const editButton = await screen.findByRole('button', { name: /Edit/i });
        await screen.findByRole('dialog', { name: /Edit Workspace/i });

        expect(titleInput).toHaveValue(workspace.title);
        await userEvent.click(editButton);

        await waitFor(() => expect(screen.getByRole('alertdialog', { name: /Success/i })).toBeInTheDocument());
    });

    it('shoud get a validation error', async () => {
        render(<CreateWorkspaceModal isOpen={true} onClose={onClose} />);
        const createButton = await screen.findByRole('button', { name: /Create/i });
        await screen.findByRole('dialog', { name: /Create Workspace/i });

        await userEvent.click(createButton);

        await waitFor(() => expect(screen.getByText("The field 'title' is required.")).toBeInTheDocument());
    });
});

