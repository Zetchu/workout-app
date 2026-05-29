import { useState, useMemo } from 'react';
import { Exercise } from './workoutService';

export function useExerciseSearch(initialExercises: Exercise[]) {
  const [searchQuery, setSearchQuery] = useState('');

  // useMemo ensures we only recalculate the filter when the query or list changes
  const filteredExercises = useMemo(() => {
    if (!searchQuery.trim()) {
      return initialExercises;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    return initialExercises.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(lowerCaseQuery) ||
        (exercise.muscle &&
          exercise.muscle.toLowerCase().includes(lowerCaseQuery)),
    );
  }, [searchQuery, initialExercises]);

  return {
    searchQuery,
    setSearchQuery,
    filteredExercises,
  };
}
