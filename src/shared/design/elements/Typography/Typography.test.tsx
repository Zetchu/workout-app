import { render, userEvent } from '@testing-library/react-native';
import { Typography } from './Typography';

describe('Design > Elements > Typography', () => {
  // Smoke test
  it('works', () => {
    render(<Typography>Hello World</Typography>);
  });

  // Unit test with mock function and user action
  it('handles press actions', async () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Typography onPress={mockOnPress}>Click Me</Typography>,
    );

    const textElement = getByText('Click Me');
    await userEvent.press(textElement);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
