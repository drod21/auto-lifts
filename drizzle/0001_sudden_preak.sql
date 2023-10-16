CREATE TABLE `completedWorkouts` (
	`workoutId` int NOT NULL,
	`userId` varchar(255) NOT NULL,
	`completedDate` datetime NOT NULL,
	`duration` timestamp NOT NULL,
	CONSTRAINT `completedWorkouts_userId_workoutId` PRIMARY KEY(`userId`,`workoutId`)
);
--> statement-breakpoint
DROP TABLE `example`;--> statement-breakpoint
ALTER TABLE `program` MODIFY COLUMN `status` enum('public','private','draft') NOT NULL;--> statement-breakpoint
ALTER TABLE `workoutExercise` MODIFY COLUMN `reps` int;--> statement-breakpoint
ALTER TABLE `workoutExercise` MODIFY COLUMN `weight` int;--> statement-breakpoint
ALTER TABLE `workoutExercise` MODIFY COLUMN `restTimer` int;--> statement-breakpoint
ALTER TABLE `workout` MODIFY COLUMN `status` enum('public','private','draft') NOT NULL;--> statement-breakpoint
ALTER TABLE `exercise` ADD `muscleGroup` varchar(255);--> statement-breakpoint
ALTER TABLE `program` ADD `scheme` varchar(255) NOT NULL;--> statement-breakpoint
CREATE INDEX `completedWorkoutId_idx` ON `completedWorkouts` (`workoutId`);
