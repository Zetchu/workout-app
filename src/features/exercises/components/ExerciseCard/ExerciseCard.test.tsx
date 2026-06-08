import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ExerciseCard from './ExerciseCard';
import { Exercise } from '../../services/workoutService';

// Mock data that mirrors an API Ninjas exercise payload
const mockExercise: Exercise = {
  name: 'Incline Dumbbell Press',
  type: 'strength',
  muscle: 'chest',
  equipment: 'dumbbells',
  difficulty: 'intermediate',
  instructions:
    'Lie back on an incline bench. Lift dumbbells above chest and press upward smoothly.',
};

describe('ExerciseCard Component', () => {
  it('renders the exercise details correctly', () => {
    render(<ExerciseCard exercise={mockExercise} />);

    // Assert that the exercise title is visible
    expect(screen.getByText('Incline Dumbbell Press')).toBeTruthy();

    // Assert that the difficulty level is displayed inside the badge
    expect(screen.getByText('intermediate')).toBeTruthy();

    // Assert that the metadata tags render correctly with emojis
    expect(screen.getByText('💪 chest')).toBeTruthy();
    expect(screen.getByText('⚙️ strength')).toBeTruthy();

    // Assert that the instructions render text accurately
    expect(
      screen.getByText(
        'Lie back on an incline bench. Lift dumbbells above chest and press upward smoothly.',
      ),
    ).toBeTruthy();
  });

  it('renders a placeholder if equipment is missing or not provided', () => {
    const incompleteExercise: Exercise = {
      ...mockExercise,
      instructions: 'Just lift it.',
    };

    render(<ExerciseCard exercise={incompleteExercise} />);
    expect(screen.getByText('Just lift it.')).toBeTruthy();
  });
});
