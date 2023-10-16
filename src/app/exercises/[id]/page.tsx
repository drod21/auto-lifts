import { db } from "@/server/db";
import ExerciseCard from "../exercise-card";
import { exercise } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import type { Exercise } from "@/server/db/types";

export default async function ExercisePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  if (!id || typeof id !== "string") {
    return null;
  }

  const selectedExercise: Exercise[] = await db
    .select()
    .from(exercise)
    .where(eq(exercise.exerciseId, +id));

  if (!selectedExercise.length || !selectedExercise[0]) {
    return null;
  }

  return <ExerciseCard exercise={selectedExercise[0]} />;
}
