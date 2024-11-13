/*
  Warnings:

  - Made the column `playListImage` on table `Playlist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Playlist" ALTER COLUMN "playListImage" SET NOT NULL,
ALTER COLUMN "playListImage" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;
