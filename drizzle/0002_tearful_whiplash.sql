ALTER TABLE `workoutExercise` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `workoutExercise` ADD `workoutExerciseId` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
CREATE INDEX `exerciseWorkoutId_idx` ON `workoutExercise` (`workoutExerciseId`);--> statement-breakpoint
ALTER TABLE `workoutExercise` ADD CONSTRAINT `workoutExercise_workoutId_workout_workoutId_fk` FOREIGN KEY (`workoutId`) REFERENCES `workout`(`workoutId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `workoutExercise` ADD CONSTRAINT `workoutExercise_exerciseId_exercise_exerciseId_fk` FOREIGN KEY (`exerciseId`) REFERENCES `exercise`(`exerciseId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `workoutExercise` ADD PRIMARY KEY(`workoutExerciseId`);