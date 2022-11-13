import { render, screen, waitFor } from '../../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component', () => {
    it('shoud render the component', async () => {
        const { container } = render(<Login />);

        expect(container).toBeInTheDocument();
    });

    it('should make an api call to login route', async () => {
        render(<Login />);
        const email = 'john@test.com';
        const password = 'password';
        const emailInput = await screen.findByLabelText('Email', { exact: false });
        const passwordInput = await screen.findByLabelText('Password', { exact: false });
        const submitButton = await screen.findByRole('button', { name: /Submit/i });

        await userEvent.type(emailInput, email);
        await userEvent.type(passwordInput, password);
        await userEvent.click(submitButton);

        await waitFor(() => expect(screen.getByRole('alertdialog', { name: /Success/i })).toBeInTheDocument());
    });

    it('should get validation errors', async () => {
        render(<Login />);
        const email = 'johntest.com';
        const emailInput = await screen.findByLabelText('Email', { exact: false });
        const submitButton = await screen.findByRole('button', { name: /Submit/i });

        await userEvent.type(emailInput, email);
        await userEvent.click(submitButton);

        await waitFor(() => expect(screen.getByText('Invalid email address.')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("The field 'password' is required.")).toBeInTheDocument());
        await waitFor(() => expect(submitButton).toBeDisabled());
    });
});

