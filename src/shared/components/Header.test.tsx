import { render } from '@testing-library/react-native';
import Header from './Header';

describe('Shared > Components > Header', () => {
  // Smoke test
  it('works', () => {
    render(<Header title='Leg Day Routine' />);
  });

  // Integration/Unit test verifying DOM output
  it('renders the title and subtitle correctly', () => {
    const { getByText } = render(<Header title='Leg Day Routine' />);

    // Verifies the prop is passed and rendered
    expect(getByText('Leg Day Routine')).toBeTruthy();

    // Verifies the internal Typography integration works
    expect(getByText("Don't skip leg day. Let's get to work.")).toBeTruthy();
  });
});
