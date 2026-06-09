ALTER TABLE `tournaments` ADD `slug` text;
--> statement-breakpoint
ALTER TABLE `tournaments` ADD `description` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `tournaments` ADD `category` text DEFAULT '' NOT NULL;
