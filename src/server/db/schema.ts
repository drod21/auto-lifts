import { pgTable, serial, varchar, timestamp, index, primaryKey, integer, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const posts = pgTable('post', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow(),
}, (table) => ({
  nameIndex: index('name_idx').on(table.name),
}));

export const users = pgTable('user', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', { withTimezone: true }),
  image: varchar('image', { length: 255 }),
});

export const verificationTokens = pgTable('verificationToken', {
  identifier: varchar('identifier', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull(),
  expires: timestamp('expires', { withTimezone: true }).notNull(),
}, (table) => ({
  compoundKey: primaryKey(table.identifier, table.token),
}));

export const exercise = pgTable('exercise', {
  exerciseId: serial('exerciseId').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  category: varchar('category', { length: 255 }).notNull(),
  imageUrl: varchar('imageUrl', { length: 255 }).notNull(),
  muscleGroup: varchar('muscleGroup', { length: 255 }),
}, (table) => ({
  exerciseIdIdx: index('exerciseId_idx').on(table.exerciseId),
}));

export const workouts = pgTable('workout', {
  workoutId: serial('workoutId').primaryKey(),
  userId: varchar('userId', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  createDate: timestamp('createDate', { withTimezone: true }).notNull(),
  status: varchar('status', { length: 20 }).notNull(),
}, (table) => ({
  workoutIdIdx: index('workoutId_idx').on(table.workoutId),
}));

export const workoutsRelations = relations(workouts, ({ one }) => ({
  user: one(users, { fields: [workouts.userId], references: [users.id] }),
}));

export const completedWorkouts = pgTable('completedWorkouts', {
  workoutId: integer('workoutId').notNull(),
  userId: varchar('userId', { length: 255 }).notNull(),
  completedDate: timestamp('completedDate', { withTimezone: true }).notNull(),
  duration: integer('duration').notNull(),
}, (table) => ({
  compoundKey: primaryKey(table.workoutId, table.userId),
  completedWorkoutIdIdx: index('completedWorkoutId_idx').on(table.workoutId),
}));

export const completedWorkoutsRelations = relations(completedWorkouts, ({ one }) => ({
  user: one(users, { fields: [completedWorkouts.userId], references: [users.id] }),
  workout: one(workouts, { fields: [completedWorkouts.workoutId], references: [workouts.workoutId] }),
}));

export const workoutExercises = pgTable('workoutExercise', {
  workoutExerciseId: serial('workoutExerciseId').primaryKey(),
  workoutId: integer('workoutId').notNull(),
  exerciseId: integer('exerciseId').notNull(),
  sets: integer('sets').notNull(),
  reps: integer('reps'),
  weight: integer('weight'),
  restTimer: integer('restTimer'),
}, (table) => ({
  exerciseWorkoutIdIdx: index('exerciseWorkoutId_idx').on(table.workoutExerciseId),
}));

export const workoutExercisesRelations = relations(workoutExercises, ({ one }) => ({
  exercise: one(exercise, { fields: [workoutExercises.exerciseId], references: [exercise.exerciseId] }),
  workout: one(workouts, { fields: [workoutExercises.workoutId], references: [workouts.workoutId] }),
}));

export const programs = pgTable('program', {
  programId: serial('programId').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  userId: varchar('userId', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  duration: varchar('duration', { length: 255 }).notNull(),
  scheme: varchar('scheme', { length: 255 }).notNull(),
  status: varchar('status', { length: 20 }).notNull(),
}, (table) => ({
  programIdIdx: index('programId_idx').on(table.programId),
}));

export const programWorkouts = pgTable('programWorkout', {
  programId: integer('programId').notNull(),
  workoutId: integer('workoutId').notNull(),
}, (table) => ({
  compoundKey: primaryKey(table.programId, table.workoutId),
}));

export const programWorkoutsRelations = relations(programWorkouts, ({ one }) => ({
  workout: one(workouts, { fields: [programWorkouts.workoutId], references: [workouts.workoutId] }),
  program: one(programs, { fields: [programWorkouts.programId], references: [programs.programId] }),
}));
