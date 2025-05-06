CREATE TABLE IF NOT EXISTS "storyData" (
	"id" serial PRIMARY KEY NOT NULL,
	"storyId" varchar,
	"storySubject" text,
	"storyType" varchar,
	"ageGroup" varchar,
	"imageStyle" varchar,
	"output" json,
	"coverImage" varchar,
	"userEmail" varchar,
	"userName" varchar,
	"userImage" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"userName" varchar,
	"userEmail" varchar,
	"userImage" varchar,
	"credits" integer DEFAULT 3
);
