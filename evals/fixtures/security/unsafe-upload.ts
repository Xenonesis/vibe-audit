import fs from "node:fs";
export function saveUpload(file: any) {
  if (!file.originalname.endsWith('.png')) throw new Error('bad type');
  fs.writeFileSync(`./public/uploads/${file.originalname}`, file.buffer);
}
