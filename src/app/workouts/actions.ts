"use server";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import {
  completedWorkouts,
  workouts,
  exercise as dbExercise,
  workoutExercises,
} from "@/server/db/schema";
import type {
  NewCompletedWorkout,
  NewWorkout,
  NewExercise,
  NewWorkoutExcercise,
  WorkoutExercise,
} from "@/server/db/types";

export const completeWorkout = async (
  completedWorkout: Omit<NewCompletedWorkout, "completedDate">,
) => {
  const result = await db
    .insert(completedWorkouts)
    .values({ ...completedWorkout, completedDate: new Date() });
  return result;
};

export const createExercise = async (
  exercise: Omit<NewExercise, "exerciseId">,
) => {
  const { name, description, category, imageUrl } = exercise;
  const result = await db.insert(dbExercise).values({
    name,
    description,
    category,
    imageUrl,
  });
  const fetchedExercise = await db
    .select()
    .from(dbExercise)
    .where(eq(dbExercise.exerciseId, +result.insertId));

  return fetchedExercise;
};
export const createWorkout = async (
  workout: NewWorkout,
  exerciseIds: number[],
) => {
  const result = await db
    .insert(workouts)
    .values({ ...workout, createDate: new Date() })
    .execute();

  const workoutId = +result.insertId;
  console.log(exerciseIds);
  const mappedExercises = exerciseIds
    .map(
      (exerciseId): NewWorkoutExcercise => ({
        workoutId,
        exerciseId,
        sets: 0,
        reps: 0,
        weight: 0,
        restTimer: 60,
      }),
    )
    .map(({ exerciseId, workoutId, sets, reps, weight, restTimer }) =>
      db.insert(workoutExercises).values({
        exerciseId,
        workoutId,
        sets,
        reps,
        weight,
        restTimer,
      }),
    );

  const mappedResults = await Promise.allSettled(mappedExercises);
  return { result, mappedResults };
};
export const createWorkoutExercise = async (we: NewWorkoutExcercise) => {
  const result = await db.insert(workoutExercises).values(we).execute();
  return result;
};
export const updateWorkoutExercise = async (we: WorkoutExercise) => {
  const result = await db
    .update(workoutExercises)
    .set(we)
    .where(eq(workoutExercises.workoutExerciseId, we.workoutExerciseId));

  const fetchedExercise = await db
    .select()
    .from(workoutExercises)
    .where(eq(workoutExercises.workoutExerciseId, +result.insertId));

  return fetchedExercise;
};
