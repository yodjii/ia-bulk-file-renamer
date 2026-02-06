export function processRename(originalName: string, prompt: string, index: number): string {
  let newName = originalName;
  const lowerPrompt = prompt.toLowerCase();

  // Mock Logic extracted for testing
  if (lowerPrompt.includes('snake')) {
    newName = newName.toLowerCase().replace(/ /g, '_');
  } else if (lowerPrompt.includes('kebab')) {
    newName = newName.toLowerCase().replace(/ /g, '-');
  } else if (lowerPrompt.includes('date')) {
    const date = new Date().toISOString().slice(0, 10);
    newName = `${date}_${newName}`;
  } else if (lowerPrompt.includes('numéro') || lowerPrompt.includes('index')) {
    const ext = newName.split('.').pop();
    const name = newName.replace(`.${ext}`, '');
    newName = `${String(index + 1).padStart(3, '0')}_${name}.${ext}`;
  } else if (lowerPrompt.includes('maj')) {
    const ext = newName.split('.').pop();
    const name = newName.replace(`.${ext}`, '');
    newName = `${name.toUpperCase()}.${ext}`;
  }

  // Default fallback
  if (newName === originalName) {
     newName = `ai_${originalName}`;
  }

  return newName;
}
