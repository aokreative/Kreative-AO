import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

async function optimizeImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await optimizeImages(fullPath);
    } else if (entry.isFile() && /\.(jpe?g|png|webp)$/i.test(entry.name)) {
      console.log(`Processing: ${fullPath}`);
      
      const image = sharp(fullPath);
      const metadata = await image.metadata();
      
      // Calculate new dimensions (max 1600px on the longest edge)
      const MAX_SIZE = 1600;
      let resizeOpts = null;
      
      if (metadata.width > MAX_SIZE || metadata.height > MAX_SIZE) {
        if (metadata.width >= metadata.height) {
          resizeOpts = { width: MAX_SIZE };
        } else {
          resizeOpts = { height: MAX_SIZE };
        }
      }
      
      let sharpInstance = image;
      if (resizeOpts) {
        sharpInstance = sharpInstance.resize({ ...resizeOpts, withoutEnlargement: true });
      }
      
      const buffer = await sharpInstance
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer();
        
      const tmpPath = fullPath + '.tmp';
      await fs.writeFile(tmpPath, buffer);
      await fs.rename(tmpPath, fullPath);
      console.log(`Optimized: ${fullPath} (Original size: ${metadata.width}x${metadata.height})`);
    }
  }
}

optimizeImages('public/brand').catch(console.error);
