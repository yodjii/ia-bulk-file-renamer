import { NextResponse } from 'next/server';

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
    // We simulate a delay to make it feel "AI-ish"
    await new Promise(resolve => setTimeout(resolve, 1500));

    const renamedFiles = files.map((file: any, index: number) => {
      // Simple mock logic based on common prompts
      let newName = file.originalName;
      
      if (prompt.toLowerCase().includes('snake')) {
        newName = newName.toLowerCase().replace(/ /g, '_');
      } else if (prompt.toLowerCase().includes('kebab')) {
        newName = newName.toLowerCase().replace(/ /g, '-');
      } else if (prompt.toLowerCase().includes('date')) {
        const date = new Date().toISOString().slice(0, 10);
        newName = `${date}_${newName}`;
      } else if (prompt.toLowerCase().includes('numéro') || prompt.toLowerCase().includes('index')) {
        const ext = newName.split('.').pop();
        const name = newName.replace(`.${ext}`, '');
        newName = `${String(index + 1).padStart(3, '0')}_${name}.${ext}`;
      }

      // Default fallback if no specific rule matches mock
      if (newName === file.originalName) {
         newName = `ai_processed_${file.originalName}`;
      }

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
