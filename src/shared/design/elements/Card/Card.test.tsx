import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from './Card';

describe('Design > Elements > Card', () => {
  // Smoke test
  it('works', () => {
    render(
      <Card>
        <Text>Workout Data</Text>
      </Card>,
    );
  });
});
