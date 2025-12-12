/*
  Warnings:

  - You are about to drop the `genreposterrel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `genreposterrel`;

-- CreateTable
CREATE TABLE `genrePosterRels` (
    `genreId` INTEGER NOT NULL,
    `posterId` INTEGER NOT NULL,

    PRIMARY KEY (`genreId`, `posterId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userRatings` ADD CONSTRAINT `userRatings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userRatings` ADD CONSTRAINT `userRatings_posterId_fkey` FOREIGN KEY (`posterId`) REFERENCES `posters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `genrePosterRels` ADD CONSTRAINT `genrePosterRels_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `genres`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `genrePosterRels` ADD CONSTRAINT `genrePosterRels_posterId_fkey` FOREIGN KEY (`posterId`) REFERENCES `posters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
