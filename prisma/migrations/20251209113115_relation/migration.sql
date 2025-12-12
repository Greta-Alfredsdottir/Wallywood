-- AddForeignKey
ALTER TABLE `cartline` ADD CONSTRAINT `cartline_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cartline` ADD CONSTRAINT `cartline_posterId_fkey` FOREIGN KEY (`posterId`) REFERENCES `posters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
