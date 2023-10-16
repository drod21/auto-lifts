import { db } from "@/server/db";
import { exercise } from "@/server/db/schema";
import CreateForm from "./create-form";
import { A, F } from "@mobily/ts-belt";
import { Exercise } from "@/server/db/types";

export type GroupedExercises = Readonly<Record<string, Exercise[]>>;

export default async function CreateWorkoutPage() {
  const exerciseList = await db
    .select({
      exerciseId: exercise.exerciseId,
      name: exercise.name,
      description: exercise.description,
      category: exercise.category,
      muscleGroup: exercise.muscleGroup,
    })
    .from(exercise);

  const groupedExercises = F.coerce<GroupedExercises>(
    A.groupBy(
      exerciseList,
      (exercise) => exercise?.muscleGroup ?? exercise.category,
    ),
  );

  return <CreateForm exercises={groupedExercises} />;
}
