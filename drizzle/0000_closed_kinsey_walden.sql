CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `example` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `example_id` PRIMARY KEY(`id`),
	CONSTRAINT `name_idx` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `exercise` (
	`exerciseId` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
	`imageUrl` varchar(255) NOT NULL,
	CONSTRAINT `exercise_exerciseId` PRIMARY KEY(`exerciseId`)
);
--> statement-breakpoint
CREATE TABLE `programWorkout` (
	`programId` int NOT NULL,
	`workoutId` int NOT NULL,
	CONSTRAINT `programWorkout_programId_workoutId` PRIMARY KEY(`programId`,`workoutId`)
);
--> statement-breakpoint
CREATE TABLE `program` (
	`programId` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`duration` varchar(255) NOT NULL,
	`status` varchar(255) NOT NULL,
	CONSTRAINT `program_programId` PRIMARY KEY(`programId`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE TABLE `workoutExercise` (
	`workoutId` int NOT NULL,
	`exerciseId` int NOT NULL,
	`sets` int NOT NULL,
	`reps` int NOT NULL,
	`weight` int NOT NULL,
	`restTimer` int NOT NULL,
	CONSTRAINT `workoutExercise_exerciseId_workoutId` PRIMARY KEY(`exerciseId`,`workoutId`)
);
--> statement-breakpoint
CREATE TABLE `workout` (
	`workoutId` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`createDate` timestamp NOT NULL,
	`status` varchar(255) NOT NULL,
	CONSTRAINT `workout_workoutId` PRIMARY KEY(`workoutId`)
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `account` (`userId`);--> statement-breakpoint
CREATE INDEX `exerciseId_idx` ON `exercise` (`exerciseId`);--> statement-breakpoint
CREATE INDEX `programId_idx` ON `program` (`programId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `session` (`userId`);--> statement-breakpoint
CREATE INDEX `workoutId_idx` ON `workout` (`workoutId`);