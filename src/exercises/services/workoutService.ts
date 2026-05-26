export interface Exercise {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  instructions: string;
}

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = 'https://api.api-ninjas.com/v1/exercises';

/**
 * Fetches exercises from the API Ninjas endpoint.
 * Allows an optional muscle group filter (e.g., 'biceps', 'chest', 'back').
 */
export async function fetchExercises(muscle?: string): Promise<Exercise[]> {
  // If a muscle group is passed, append it as a query parameter
  const url = muscle
    ? `${BASE_URL}?muscle=${encodeURIComponent(muscle)}`
    : BASE_URL;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': API_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch exercises: ${response.status} ${response.statusText}`,
    );
  }

  // API Ninjas returns a raw JSON array of exercise objects
  const data = (await response.json()) as Exercise[];
  return data;
}
