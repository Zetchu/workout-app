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

export async function fetchExercises(muscle?: string): Promise<Exercise[]> {
  // Safety check to ensure the .env variable is loaded
  if (!API_KEY) {
    throw new Error(
      'API Key is missing! Make sure EXPO_PUBLIC_API_KEY is set in your .env file.',
    );
  }

  // API Ninjas REQUIRES at least one query parameter.
  // If no muscle is specified, we fallback to fetching all 'strength' exercises
  // to provide a solid baseline of movements for muscle growth routines.
  const query = muscle
    ? `muscle=${encodeURIComponent(muscle)}`
    : `type=strength`;

  const url = `${BASE_URL}?${query}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': API_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    // Read the actual error message from the API Ninjas server
    const errorDetails = await response.text();

    throw new Error(
      `Failed to fetch exercises: ${response.status} - ${errorDetails}`,
    );
  }

  const data = (await response.json()) as Exercise[];
  return data;
}
