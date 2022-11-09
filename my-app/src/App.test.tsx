import App from './App';
import {
    componentRenderByMemoryRouter,
    toBeExpectByTestId,
    toBeExpectByText,
} from './util';

describe('Test App Router', () => {
    test('should render app componet', () => {
        componentRenderByMemoryRouter('/', <App />);
        toBeExpectByTestId('app-component-test-id');
    });

    test('should Render forcaste component with path "/"', () => {
        componentRenderByMemoryRouter('/', <App />);
        toBeExpectByText('Weather Application');
    });
  })
