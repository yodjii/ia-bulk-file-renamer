import { NextResponse } from 'next/server';
import { processRename } from '@/utils/renamer';
import { TEST_SCENARIOS } from '../../../../test-dataset'; // Relative path from api/rename

// Build the dynamic system prompt with few-shot examples
function buildSystemPrompt() {
  const examples = TEST_SCENARIOS.map(scenario => {
    return `Instruction: "${scenario.prompt}"\nInput: ${JSON.stringify(scenario.files)}\nOutput: ${JSON.stringify(scenario.expected)}\n---`;
  }).join('\n');

  return `You are an expert file renaming assistant.
Current Date: ${new Date().toISOString().split('T')[0]}

RULES:
1. Preserve file extensions.
2. Use the following examples to understand the logic:

${examples}

Now, process the user request.`;
}

// Simulation for POC (replace with real LLM call)
export async function POST(request: Request) {
  try {
    const { files, prompt } = await request.json();

    if (!files || !Array.isArray(files)) {
      return NextResponse.json({ error: 'Files array required' }, { status: 400 });
    }

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt required' }, { status: 400 });
    }

    // Generate the full context for the AI
    const systemInstruction = buildSystemPrompt();
    console.log("--- GENERATED SYSTEM PROMPT ---\n", systemInstruction.substring(0, 500) + "... [truncated]");

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
