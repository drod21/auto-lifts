// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import {
	bigint,
  datetime,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  foreignKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";


/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const posts = mysqlTable(
  "post",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .notNull()
    .unique()
    .primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

const statusEnum = mysqlEnum("status", ["public", "private", "draft"]);

export const exercise = mysqlTable(
  "exercise",
  {
    exerciseId: int("exerciseId").autoincrement().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    category: varchar("category", { length: 255 }).notNull(),
    imageUrl: varchar("imageUrl", { length: 255 }).notNull(),
    muscleGroup: varchar("muscleGroup", { length: 255 }),
  },
  (ex) => ({
    exerciseIdIdx: index("exerciseId_idx").on(ex.exerciseId),
  }),
);

export const workouts = mysqlTable(
  "workout",
  {
    workoutId: int("workoutId").autoincrement().primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    createDate: timestamp("createDate", { mode: "date" }).notNull(),
    status: statusEnum.notNull(),
  },
  (w) => ({
    workoutIdIdx: index("workoutId_idx").on(w.workoutId),
  }),
);

export const workoutsRelations = relations(workouts, ({ one }) => ({
  user: one(users, { fields: [workouts.userId], references: [users.id] }),
}));

export const completedWorkouts = mysqlTable(
  "completedWorkouts",
  {
    workoutId: int("workoutId").notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
    completedDate: datetime("completedDate", { mode: "date" }).notNull(),
    duration: timestamp("duration", { mode: "date" }).notNull(),
  },
  (cw) => ({
    compoundKey: primaryKey(cw.workoutId, cw.userId),
    completedWorkoutIdIdx: index("completedWorkoutId_idx").on(cw.workoutId),
  }),
);
export const completedWorkoutsRelations = relations(
  completedWorkouts,
  ({ one }) => ({
    user: one(users, {
      fields: [completedWorkouts.userId],
      references: [users.id],
    }),
    workout: one(workouts, {
      fields: [completedWorkouts.workoutId],
      references: [workouts.workoutId],
    }),
  }),
);

export const workoutExercises = mysqlTable(
  "workoutExercise",
  {
    workoutExerciseId: int("workoutExerciseId").autoincrement().primaryKey(),
    workoutId: int("workoutId").notNull(),
    exerciseId: int("exerciseId").notNull(),
    sets: int("sets").notNull(),
    reps: int("reps"),
    weight: int("weight"),
    restTimer: int("restTimer"),
  },
  (we) => {
    return {
      workoutReference: foreignKey({
        columns: [we.workoutId],
        foreignColumns: [workouts.workoutId],
      }),
      exerciseReference: foreignKey({
        columns: [we.exerciseId],
        foreignColumns: [exercise.exerciseId],
      }),
      exerciseWorkoutIdIdx: index("exerciseWorkoutId_idx").on(
        we.workoutExerciseId,
      ),
    };
  },
);

export const workoutExercisesRelations = relations(
  workoutExercises,
  ({ one }) => ({
    exercise: one(exercise, {
      fields: [workoutExercises.exerciseId],
      references: [exercise.exerciseId],
    }),
    workout: one(workouts, {
      fields: [workoutExercises.workoutId],
      references: [workouts.workoutId],
    }),
  }),
);

export const programs = mysqlTable(
  "program",
  {
    programId: int("programId").autoincrement().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    duration: varchar("duration", { length: 255 }).notNull(),
    scheme: varchar("scheme", { length: 255 }).notNull(),
    status: statusEnum.notNull(),
  },
  (p) => ({
    programIdIdx: index("programId_idx").on(p.programId),
  }),
);

export const programWorkouts = mysqlTable(
  "programWorkout",
  {
    programId: int("programId").notNull(),
    workoutId: int("workoutId").notNull(),
  },
  (pw) => ({
    compoundKey: primaryKey(pw.programId, pw.workoutId),
  }),
);

export const programWorkoutsRelations = relations(
  programWorkouts,
  ({ one }) => ({
    workout: one(workouts, {
      fields: [programWorkouts.workoutId],
      references: [workouts.workoutId],
    }),
    program: one(programs, {
      fields: [programWorkouts.programId],
      references: [programs.programId],
    }),
  }),
);
