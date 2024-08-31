CREATE TABLE `Organization` (
	`organization_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updatedAt` integer
);
--> statement-breakpoint
CREATE TABLE `Task` (
	`organization_id` text NOT NULL,
	`task_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`qualities` text NOT NULL,
	`urgency` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updatedAt` integer,
	`status` integer NOT NULL,
	FOREIGN KEY (`organization_id`) REFERENCES `Organization`(`organization_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `TaskRequisition` (
	`organization_id` text NOT NULL,
	`task_id` text NOT NULL,
	`requisition_id` text NOT NULL,
	`quantity` integer NOT NULL,
	FOREIGN KEY (`organization_id`) REFERENCES `Task`(`organization_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`task_id`) REFERENCES `Task`(`task_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `User` (
	`user_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`qualities` integer NOT NULL,
	`email` text NOT NULL,
	`clerk_id` text,
	`role` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updatedAt` integer
);
--> statement-breakpoint
CREATE TABLE `UserTask` (
	`user_id` text NOT NULL,
	`organization_id` text NOT NULL,
	`task_id` text NOT NULL,
	`status` integer NOT NULL,
	`join_date` integer NOT NULL,
	`finished_date` integer,
	FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`organization_id`) REFERENCES `Task`(`organization_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`task_id`) REFERENCES `Task`(`task_id`) ON UPDATE no action ON DELETE no action
);
