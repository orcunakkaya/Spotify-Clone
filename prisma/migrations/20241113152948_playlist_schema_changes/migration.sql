-- AlterTable
ALTER TABLE "Playlist" ALTER COLUMN "songs" SET DEFAULT ARRAY[]::JSONB[];
