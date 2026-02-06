import { NextResponse } from 'next/server';
import { processRename } from '@/utils/renamer';

// Simulation for POC (replace with real LLM call)
// In a real scenario, we would use the OpenAI or Gemini SDK here
export async function POST(request: Request) {
  try {
    const { files, prompt } = await request.json();

    if (!files || !Array.isArray(files)) {
      return NextResponse.json({ error: 'Files array required' }, { status: 400 });
    }

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt required' }, { status: 400 });
    }

    console.log(`Processing ${files.length} files with prompt: "${prompt}"`);

    // Mock AI Logic (to be replaced with real API call)
    await new Promise(resolve => setTimeout(resolve, 500));

    const renamedFiles = files.map((file: any, index: number) => {
      const newName = processRename(file.originalName, prompt, index);
      return {
        originalName: file.originalName,
        newName: newName
      };
    });

    return NextResponse.json({ files: renamedFiles });

  } catch (error) {
    console.error('Error processing rename request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
