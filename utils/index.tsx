import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export async function readData(filename: string, locale: string = 'zh'): Promise<string> {
  const dataDir = path.join(process.cwd(), 'data');
  let { dir, name, ext } = path.parse(filename);
  if (locale !== 'zh') {
    name = `${name}.${locale}`;
    try {
      return await fs.readFile(path.join(dataDir, path.format({ dir, name, ext })), 'utf-8');
    } catch (e) {}
  }
  return await fs.readFile(path.join(dataDir, filename), 'utf-8');
}

export async function loadYaml(filename: string, locale: string = 'zh'): Promise<any> {
  return yaml.load(await readData(filename, locale));
}

export async function getMarkdownFiles(): Promise<string[]> {
  const contents = path.join(process.cwd(), 'data/contents');
  return (await fs.readdir(contents))
    .filter((name) => /^[^\.]+\.md$/.test(name))
    .map((name) => name.split('.')[0]);
}
