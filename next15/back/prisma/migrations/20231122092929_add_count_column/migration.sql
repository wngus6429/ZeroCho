-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "commentCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "heartCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "repostCount" INTEGER NOT NULL DEFAULT 0;
