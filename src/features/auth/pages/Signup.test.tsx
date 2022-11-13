import { render, screen, waitFor } from '../../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import SignUp from './Signup';


describe('Signup component', () => {
    it('shoud render the component', async () => {
        const { container } = render(<SignUp />);

        expect(container).toBeInTheDocument();
    });

    it('should make an api call to signup route', async () => {
        render(<SignUp />);
        const name = 'John';
        const lastName = 'Doe';
        const username = 'johndoe';
        const email = 'john@test.com';
        const password = 'password';
        const confirmPassword = 'password';
        const nameInput = await screen.findByLabelText('First name', { exact: false });
        const lastNameInput = await screen.findByLabelText('Last name', { exact: false });
        const usernameInput = await screen.findByLabelText('Username', { exact: false });
        const emailInput = await screen.findByLabelText('Email', { exact: false });
        const passwordInput = await screen.findByPlaceholderText('Password');
        const confirmPasswordInput = await screen.findByLabelText('Confirm password', { exact: false });
        const submitButton = screen.getByRole('button', { name: /Submit/i });

        await userEvent.type(nameInput, name);
        await userEvent.type(lastNameInput, lastName);
        await userEvent.type(usernameInput, username);
        await userEvent.type(emailInput, email);
        await userEvent.type(passwordInput, password);
        await userEvent.type(confirmPasswordInput, confirmPassword);
        await userEvent.click(submitButton);

        await waitFor(() => expect(screen.getByRole('alertdialog', { name: /Success/i })).toBeInTheDocument())
    })

    it('should get validation errors', async () => {
        render(<SignUp />);
        const email = 'johntest.com';
        const emailInput = await screen.findByLabelText('Email', { exact: false });
        const submitButton = screen.getByRole('button', { name: /Submit/i });

        await userEvent.type(emailInput, email);
        await userEvent.click(submitButton);

        await waitFor(() => expect(screen.getByText("The field 'name' is required.")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("The field 'lastName' is required.")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("The field 'username' is required.")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Invalid email address.')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("The field 'password' is required.")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("The field 'confirmPassword' is required.")).toBeInTheDocument());
        await waitFor(() => expect(submitButton).toBeDisabled());
    })
});

