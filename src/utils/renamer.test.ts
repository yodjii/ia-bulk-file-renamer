import { expect, test, describe } from 'vitest';
import { processRename } from './renamer';

describe('Renaming Logic', () => {
  test('should convert to snake_case', () => {
    const original = 'My File Name.txt';
    const prompt = 'Convert to snake case';
    const result = processRename(original, prompt, 0);
    expect(result).toBe('my_file_name.txt');
  });

  test('should convert to kebab-case', () => {
    const original = 'My File Name.txt';
    const prompt = 'kebab case please';
    const result = processRename(original, prompt, 0);
    expect(result).toBe('my-file-name.txt');
  });

  test('should add date', () => {
    const original = 'report.pdf';
    const prompt = 'add date';
    const result = processRename(original, prompt, 0);
    const date = new Date().toISOString().slice(0, 10);
    expect(result).toBe(`${date}_report.pdf`);
  });

  test('should add index number', () => {
    const original = 'photo.jpg';
    const prompt = 'ajouter un numéro index';
    const result = processRename(original, prompt, 4); // 5th item
    expect(result).toBe('005_photo.jpg');
  });

  test('should handle uppercase', () => {
    const original = 'lower.txt';
    const prompt = 'mettre en maj';
    const result = processRename(original, prompt, 0);
    expect(result).toBe('LOWER.txt');
  });
});
