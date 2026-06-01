import { render } from '@testing-library/react-native';
import { Badge } from './Badge';

describe('Design > Elements > Badge', () => {
  // Smoke test
  it('works', () => {
    render(
      <Badge
        label='Hypertrophy'
        backgroundColor='#38bdf8'
      />,
    );
  });
});
