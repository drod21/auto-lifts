import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { exercise, workoutExercises, workouts } from "@/server/db/schema";
import type { Exercise, Workout, WorkoutExercise } from "@/server/db/types";
import ExerciseCard from "@/app/exercises/exercise-card";
export default async function WorkoutExercisePage({
  params,
}: {
  params: { workoutId: string };
}) {
  const { workoutId } = params;
  const res = await db
    .select()
    .from(workouts)
    .innerJoin(
      workoutExercises,
      eq(workouts.workoutId, workoutExercises.workoutId),
    )
    .innerJoin(exercise, eq(workoutExercises.exerciseId, exercise.exerciseId))
    .where(eq(workouts.workoutId, +workoutId));
  const aggregated = res.reduce(
    (acc, curr) => {
      const { exercise, workoutExercise } = curr;
      if (Array.isArray(acc)) {
        acc.push({ exercise, workoutExercise });
        return acc;
      }
      return [
        {
          exercise,
          workoutExercise,
        },
      ];
    },
    [] as Array<
      Record<"exercise" | "workoutExercise", WorkoutExercise | Exercise>
    >,
  );
  const workout = res?.[0]?.workout;

  // const workoutArr: Workout[] = res.map(
  //   (r: JoinedTables): Workout => r.workout,
  // );
  // const workoutExercise = await db
  //   .select()
  //   .from(workoutExercises)
  //   .where(eq(workoutExercises.workoutId, +workoutId))
  //   .innerJoin(exercise, eq(workoutExercises.exerciseId, exercise.exerciseId));

  return (
    <div>
      {aggregated.map(({ exercise, workoutExercise }) => (
        <ExerciseCard
          key={exercise.exerciseId}
          exercise={exercise as Exercise}
          workoutExercise={workoutExercise as WorkoutExercise}
        />
      ))}
    </div>
  );
}
