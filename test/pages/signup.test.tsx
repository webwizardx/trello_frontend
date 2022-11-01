import { render, screen, waitFor } from '../../src/test/test_utils';
import '@testing-library/jest-dom';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Signup from '../../pages/signup';
import userEvent from '@testing-library/user-event';

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Signup component', () => {
    it('shoud render the component', async () => {
        const { container } = render(<Signup />);

        expect(container).toBeInTheDocument();
    });

    it('should make an api call to signup route', async () => {
        render(<Signup />);
        const body = {
            message: "Signup successfully"
        };
        const name = 'John';
        const lastName = 'Doe';
        const username = 'johndoe';
        const email = 'john@test.com';
        const password = 'password';
        const confirmPassword = 'password';
        const nameInput = await screen.findByPlaceholderText('First name');
        const lastNameInput = await screen.findByPlaceholderText('Last name');
        const usernameInput = await screen.findByPlaceholderText('Username');
        const emailInput = await screen.findByPlaceholderText('Email');
        const passwordInput = await screen.findByPlaceholderText('Password');
        const confirmPasswordInput = await screen.findByPlaceholderText('Confirm password');
        const submitButton = screen.getByRole('button', { name: /Submit/i });
        server.use(rest.post('http://localhost/api/v1/auth/signup', (_, res, ctx) => {
            return res(ctx.status(201), ctx.json(body));
        }))

        userEvent.type(nameInput, name);
        userEvent.type(lastNameInput, lastName);
        userEvent.type(usernameInput, username);
        userEvent.type(emailInput, email);
        userEvent.type(passwordInput, password);
        userEvent.type(confirmPasswordInput, confirmPassword);
        userEvent.click(submitButton);

        await waitFor(() => expect(screen.getByText(body.message)).toBeInTheDocument())

    })

    it('should get validation errors', async () => {
        render(<Signup />);
        const mockSignup = jest.fn();
        const body = {
            message: "Signup successfully"
        };
        const email = 'johntest.com';
        const emailInput = await screen.findByPlaceholderText('Email');
        const submitButton = screen.getByRole('button', { name: /Submit/i });
        server.use(rest.post('http://localhost/api/v1/auth/signup', (_, res, ctx) => {
            return res(ctx.status(201), ctx.json(body));
        }))

        userEvent.type(emailInput, email);
        userEvent.click(submitButton);

        await waitFor(() => expect(mockSignup).not.toHaveBeenCalled());
        await waitFor(() => expect(screen.getByText("The field 'name' is required.")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("The field 'lastName' is required.")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("The field 'username' is required.")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Invalid email address.')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("The field 'password' is required.")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("The field 'confirmPassword' is required.")).toBeInTheDocument());
        await waitFor(() => expect(submitButton).toBeDisabled());
    })
});

