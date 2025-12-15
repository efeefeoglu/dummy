import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/content.json');

export interface ContentData {
  home: {
    title: string;
    subtitle: string;
    heroImage: string;
  };
  brands: {
    title: string;
    description: string;
    items: { name: string; logo: string }[];
  };
  products: {
    title: string;
    description: string;
    items: { name: string; price: string; image: string; description: string }[];
  };
  solutions: {
    title: string;
    description: string;
    items: { title: string; description: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
    address: string;
    email: string;
    phone: string;
  };
}

export function getContent(): ContentData {
  const jsonData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(jsonData);
}

export function updateContent(newContent: ContentData): void {
  fs.writeFileSync(dataFilePath, JSON.stringify(newContent, null, 2), 'utf8');
}
