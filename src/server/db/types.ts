import type {
  exercise,
  posts,
  programs,
  programWorkouts,
  users,
  verificationTokens,
  workouts,
  workoutExercises,
  completedWorkouts,
} from "./schema";

export type Post = typeof posts.$inferSelect;
export type User = typeof users.$inferSelect;
export type VerificationToken = typeof verificationTokens.$inferSelect;
export type Exercise = typeof exercise.$inferSelect;
export type Workout = typeof workouts.$inferSelect;
export type WorkoutExercise = typeof workoutExercises.$inferSelect;
export type Program = typeof programs.$inferSelect;
export type ProgramWorkout = typeof programWorkouts.$inferSelect;
export type CompletedWorkout = typeof completedWorkouts.$inferSelect;

export type NewPost = typeof posts.$inferInsert;
export type NewUser = typeof users.$inferInsert;
export type NewVerificationToken = typeof verificationTokens.$inferInsert;
export type NewExercise = typeof exercise.$inferInsert;
export type NewWorkout = typeof workouts.$inferInsert;
export type NewWorkoutExercise = typeof workoutExercises.$inferInsert;
export type NewProgram = typeof programs.$inferInsert;
export type NewProgramWorkout = typeof programWorkouts.$inferInsert;
export type NewCompletedWorkout = typeof completedWorkouts.$inferInsert;

// Add this new type definition
export interface Database {
  public: {
    Tables: {
      post: typeof posts,
      user: typeof users,
      verificationToken: typeof verificationTokens,
      exercise: typeof exercise,
      workout: typeof workouts,
      workoutExercise: typeof workoutExercises,
      program: typeof programs,
      programWorkout: typeof programWorkouts,
      completedWorkouts: typeof completedWorkouts,
    };
    Views: {
      // Add any views here if you have them
    };
    Functions: {
      // Add any custom functions here if you have them
    };
    Enums: {
      // Add any custom enums here if you have them
    };
  };
}
