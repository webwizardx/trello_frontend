import { render, } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../pages/index';

describe('Home component', () => {
    it('shoud render the component', async () => {
        const { container } = render(<Home />);

        expect(container).toHaveTextContent('Dashboard');
    });
});

