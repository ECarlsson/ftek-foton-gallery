import path from 'path';
import fs from 'fs/promises';

/**
 * Deletes images from disk
 * @param images File names of images to delete
 * @throws Throws an error if file system operations fail
 */
export function deleteImages(images: string[]) {
  const imageDir = path.join(__dirname, '..', '..', 'images');
  images.forEach(async (image) => {
    await fs.unlink(path.join(imageDir, 'fullsize', image));
    await fs.unlink(path.join(imageDir, 'thumbnail', image));
    await fs.unlink(path.join(imageDir, 'scaled', image));
  });
}