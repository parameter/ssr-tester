import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const directoryPath = path.join(process.cwd(), 'content-json', 'blogg');
  const fileNames = fs.readdirSync(directoryPath);
  const jsonData = fileNames.map((fileName) => {
    const filePath = path.join(directoryPath, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  });
  const combinedData = [].concat(...jsonData);
  res.status(200).json(combinedData);
}
