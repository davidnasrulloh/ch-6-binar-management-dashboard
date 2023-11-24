import sharp from "sharp";
import path from "path";
import datetime from "./datetime";

class Resizer {
  private folder: string;
  private prefix: string;

  constructor(folder: string, prefix = "") {
    this.folder = folder;
    this.prefix = prefix;
  }

  async save(buffer: Buffer): Promise<string> {
    const filename = `${this.prefix}${datetime()}.webp`;
    const filepath = this.filepath(filename);

    // Resize image to 360p resolution
    await sharp(buffer)
      .resize(480, 360, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFormat("webp")
      .toFile(filepath);

    return filename;
  }

  private filepath(filename: string): string {
    return path.resolve(`${this.folder}/${filename}`);
  }
}

export default Resizer;
