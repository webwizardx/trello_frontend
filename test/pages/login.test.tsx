import { render, screen, waitFor } from '../../src/test/test_utils';
import '@testing-library/jest-dom';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Login from '../../pages/login';
import userEvent from '@testing-library/user-event';

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Login component', () => {
    it('shoud render the component', async () => {
        const { container } = render(<Login />);

        expect(container).toBeInTheDocument();
    });

    it('should make an api call to login route', async () => {
        render(<Login />);
        const body = {
            message: "Login successfully",
            data: {
                apiToken: "API_TOKEN"
            }
        };
        const email = 'john@test.com';
        const password = 'password';
        const emailInput = await screen.findByPlaceholderText('Email');
        const passwordInput = await screen.findByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /Submit/i });
        server.use(rest.post('http://localhost/api/login', (_, res, ctx) => {
            return res(ctx.status(201), ctx.json(body));
        }))

        userEvent.type(emailInput, email);
        userEvent.type(passwordInput, password);
        userEvent.click(submitButton);

        await waitFor(() => expect(screen.getByText(body.message)).toBeInTheDocument())

    })

    it('should get validation errors', async () => {
        render(<Login />);
        const mockLogin = jest.fn();
        const body = {
            message: "Login successfully",
            data: {
                apiToken: "API_TOKEN"
            }
        };
        const email = 'johntest.com';
        const emailInput = await screen.findByPlaceholderText('Email');
        const submitButton = screen.getByRole('button', { name: /Submit/i })
        server.use(rest.post('http://localhost/api/login', (_, res, ctx) => {
            mockLogin();
            return res(ctx.status(201), ctx.json(body));
        }))

        userEvent.type(emailInput, email);
        userEvent.click(submitButton);

        await waitFor(() => expect(mockLogin).not.toHaveBeenCalled());
        await waitFor(() => expect(screen.getByText('Invalid email address.')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("The field 'password' is required.")).toBeInTheDocument());
        await waitFor(() => expect(submitButton).toBeDisabled());
    })
});

