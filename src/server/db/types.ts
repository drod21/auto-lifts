import type {
  completedWorkouts,
  programWorkouts,
  programs,
  exercise,
  workoutExercises,
  workouts,
  verificationTokens,
  users,
} from "./schema";

export type CompletedWorkout = typeof completedWorkouts.$inferSelect;
export type Program = typeof programs.$inferSelect;
export type ProgramWorkout = typeof programWorkouts.$inferSelect;
export type WorkoutExercise = typeof workoutExercises.$inferSelect;
export type Workout = typeof workouts.$inferSelect;
export type Exercise = typeof exercise.$inferSelect;
export type VerificationToken = typeof verificationTokens.$inferSelect;
export type User = typeof users.$inferSelect;

export type NewCompletedWorkout = typeof completedWorkouts.$inferInsert;
export type NewUser = typeof users.$inferInsert;
export type NewVerificationToken = typeof verificationTokens.$inferInsert;
export type NewExercise = typeof exercise.$inferInsert;
export type NewWorkout = typeof workouts.$inferInsert;
export type NewWorkoutExcercise = typeof workoutExercises.$inferInsert;
export type NewProgram = typeof programs.$inferInsert;
export type NewProgramWorkout = typeof programWorkouts.$inferInsert;
