import { render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import Navbar from './Navbar';
import userEvent from '@testing-library/user-event';

describe('Navbar component', () => {
    it('shoud render the component', async () => {
        render(<Navbar />);
        const workspacesButton = await screen.findByRole('button', { name: /Workspaces/i });

        await userEvent.click(workspacesButton);

        const workspaces = await screen.findAllByRole('menuitem');
        expect(workspaces).toHaveLength(3);
    });
});

