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
	CompletedWorkout,
  NewCompletedWorkout,
  NewWorkout,
  NewExercise,
  NewWorkoutExercise,
  WorkoutExercise,
} from "@/server/db/types";

export const completeWorkout = async (
  completedWorkout: Omit<CompletedWorkout, "completedDate">,
) => {
  const result = (await db
    .insert(completedWorkouts)
    .values({ ...completedWorkout, completedDate: new Date().toDateString() }).returning());

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
  }).returning();

  return result;
};
export const createWorkout = async (
  workout: NewWorkout,
  exerciseIds: number[],
) => {
  const result = await db
    .insert(workouts)
    .values({ ...workout, createDate: new Date().toDateString() })
    .returning();
		const res = result[0]

		const workoutId = res?.workoutId

  if (!workoutId){
		throw new Error('oops');
	}

  const mappedExercises = exerciseIds
    .map(
      (exerciseId): NewWorkoutExercise => ({
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
  return { result: res, mappedResults };
};
export const createWorkoutExercise = async (we: NewWorkoutExercise) => {
   await db.insert(workoutExercises).values(we);
};
export const updateWorkoutExercise = async (we: WorkoutExercise) => {
  const result = await db
    .update(workoutExercises)
    .set(we)
    .where(eq(workoutExercises.workoutExerciseId, we.workoutExerciseId)).returning();


  return result;
};
