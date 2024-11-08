import { render, screen } from '../testing-utils';
import App from './app';

describe('App', () => {
  it('renders the App component', () => {
    render(<App />);
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});