import { render, screen, waitFor } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar';
import userEvent from '@testing-library/user-event';

describe('Sidebar component', () => {
    it('shoud render the component', async () => {
        render(<Sidebar />);
        const workspaces = await screen.findAllByTestId('sidebar-workspace-item');

        expect(workspaces).toHaveLength(3);
    });

    it('shoud open create workspace modal', async () => {
        render(<Sidebar />);
        const createWorkspaceButton = await screen.findByRole('button', { hidden: true });

        await userEvent.click(createWorkspaceButton);

        await waitFor(() => expect(screen.getByRole('dialog', { name: /Create Workspace/i })).toBeInTheDocument());
    });

    it('shoud open edit workspace modal', async () => {
        render(<Sidebar />);
        const [editWorkspaceButton] = await screen.findAllByText(/Edit/i);

        await userEvent.click(editWorkspaceButton);

        await waitFor(() => expect(screen.getByRole('dialog', { name: /Edit Workspace/i })).toBeInTheDocument());
    });

    it('shoud call delete workspace API', async () => {
        render(<Sidebar />);
        const [deleteWorkspaceButton] = await screen.findAllByText(/Delete/i);

        await userEvent.click(deleteWorkspaceButton);

        await waitFor(() => expect(screen.getByRole('alertdialog', { name: /Success/i })).toBeInTheDocument());
    });
});

