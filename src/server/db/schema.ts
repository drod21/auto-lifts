import { pgTable, serial, varchar, timestamp, index, primaryKey, integer, text, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('user', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: varchar('image', { length: 255 }),
}, (table) => ({
  emailIndex: index('email_idx').on(table.email),
}));

export const posts = pgTable('post', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow(),
}, (table) => ({
  nameIndex: index('name_idx').on(table.name),
}));

export const verificationTokens = pgTable('verificationToken', {
  identifier: varchar('identifier', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
}, (table) => ({
  compoundKey: primaryKey(table.identifier, table.token),
  tokenIndex: index('token_idx').on(table.token),
}));

export const exercise = pgTable('exercise', {
  exerciseId: serial('exerciseId').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 255 }).notNull(),
  imageUrl: varchar('imageUrl', { length: 255 }).notNull(),
  muscleGroup: varchar('muscleGroup', { length: 255 }),
}, (table) => ({
  nameIndex: index('exercise_name_idx').on(table.name),
  categoryIndex: index('exercise_category_idx').on(table.category),
}));

export const workouts = pgTable('workout', {
  workoutId: serial('workoutId').primaryKey(),
  userId: varchar('userId', { length: 255 }).notNull().references(() => users.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  createDate: date('createDate').notNull(),
  status: varchar('status', { length: 20 }).notNull(),
}, (table) => ({
  userIdIndex: index('workout_userId_idx').on(table.userId),
  statusIndex: index('workout_status_idx').on(table.status),
}));

export const workoutsRelations = relations(workouts, ({ one }) => ({
  user: one(users, { fields: [workouts.userId], references: [users.id] }),
}));

export const completedWorkouts = pgTable('completedWorkouts', {
  workoutId: integer('workoutId').notNull().references(() => workouts.workoutId),
  userId: varchar('userId', { length: 255 }).notNull().references(() => users.id),
  completedDate: date('completedDate').notNull(),
  duration: integer('duration').notNull(),
}, (table) => ({
  compoundKey: primaryKey(table.workoutId, table.userId),
  userIdIndex: index('completedWorkouts_userId_idx').on(table.userId),
  completedDateIndex: index('completedWorkouts_date_idx').on(table.completedDate),
}));

export const completedWorkoutsRelations = relations(completedWorkouts, ({ one }) => ({
  user: one(users, { fields: [completedWorkouts.userId], references: [users.id] }),
  workout: one(workouts, { fields: [completedWorkouts.workoutId], references: [workouts.workoutId] }),
}));

export const workoutExercises = pgTable('workoutExercise', {
  workoutExerciseId: serial('workoutExerciseId').primaryKey(),
  workoutId: integer('workoutId').notNull().references(() => workouts.workoutId),
  exerciseId: integer('exerciseId').notNull().references(() => exercise.exerciseId),
  sets: integer('sets').notNull(),
  reps: integer('reps'),
  weight: integer('weight'),
  restTimer: integer('restTimer'),
}, (table) => ({
  workoutIdIndex: index('workoutExercise_workoutId_idx').on(table.workoutId),
  exerciseIdIndex: index('workoutExercise_exerciseId_idx').on(table.exerciseId),
}));

export const workoutExercisesRelations = relations(workoutExercises, ({ one }) => ({
  exercise: one(exercise, { fields: [workoutExercises.exerciseId], references: [exercise.exerciseId] }),
  workout: one(workouts, { fields: [workoutExercises.workoutId], references: [workouts.workoutId] }),
}));

export const programs = pgTable('program', {
  programId: serial('programId').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  userId: varchar('userId', { length: 255 }).notNull().references(() => users.id),
  description: text('description').notNull(),
  duration: varchar('duration', { length: 255 }).notNull(),
  scheme: varchar('scheme', { length: 255 }).notNull(),
  status: varchar('status', { length: 20 }).notNull(),
}, (table) => ({
  userIdIndex: index('program_userId_idx').on(table.userId),
  statusIndex: index('program_status_idx').on(table.status),
}));

export const programWorkouts = pgTable('programWorkout', {
  programId: integer('programId').notNull().references(() => programs.programId),
  workoutId: integer('workoutId').notNull().references(() => workouts.workoutId),
}, (table) => ({
  compoundKey: primaryKey(table.programId, table.workoutId),
  programIdIndex: index('programWorkout_programId_idx').on(table.programId),
}));

export const programWorkoutsRelations = relations(programWorkouts, ({ one }) => ({
  workout: one(workouts, { fields: [programWorkouts.workoutId], references: [workouts.workoutId] }),
  program: one(programs, { fields: [programWorkouts.programId], references: [programs.programId] }),
}));
