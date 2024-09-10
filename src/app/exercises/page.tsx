import Link from 'next/link';
import { db } from "@/server/db";
import { exercise } from "@/server/db/schema";

export default async function ExercisePage() {
  const selectedExercises = await db.select().from(exercise);
	console.log('here', selectedExercises)
  return (
    <div>
      <h1>Exercises</h1>
      <ul>
        {selectedExercises.map((exercise) => (
          <li key={exercise.exerciseId}>
						<Link href={`/exercises/${exercise.exerciseId}`}>{exercise.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
