import { render, screen } from '../../testing-utils';
import Error404 from './Error404';

describe('Error404 page', () => {
  it('renders the Error404 page', () => {
    render(<Error404 />);
		
    screen.debug(); // prints out the jsx in the Error404 component unto the command
    screen.getByText('404');
  });
});