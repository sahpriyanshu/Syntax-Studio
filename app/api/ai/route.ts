import { NextRequest, NextResponse } from 'next/server';
import { generateCode } from '@/app/lib/gemini-ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode, prompt, currentCode } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const generatedFiles = await generateCode({
      mode,
      prompt,
      currentCode
    });

    return NextResponse.json({ files: generatedFiles });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate code. Please try again.' },
      { status: 500 }
    );
  }
}
