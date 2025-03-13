import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 0.9,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 8192,
};

export interface AICodeRequest {
  mode: 'generate' | 'improve';
  prompt: string;
  currentCode?: string;
}

export interface GeneratedFiles {
  html?: string;
  css?: string;
  js?: string;
}

export async function generateCode(request: AICodeRequest): Promise<GeneratedFiles> {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    let prompt = '';
    if (request.mode === 'generate') {
      prompt = `Generate a complete web application based on the following request. Return three separate code blocks for HTML, CSS, and JavaScript.
The code should be:
- Simple and focused
- Well-commented
- Follow modern web development best practices
- Use semantic HTML
- Include responsive CSS
- Handle basic interactivity with JavaScript

IMPORTANT REQUIREMENTS:
1. The HTML file MUST use exactly this link tag: <link rel="stylesheet" href="styles.css">
2. DO NOT use any variations like style.css or main.css
3. The CSS code will be saved as styles.css automatically

Request: ${request.prompt}

Return the code in the following format EXACTLY:
---HTML---
[Your HTML code here]
---CSS---
[Your CSS code here]
---JS---
[Your JavaScript code here]`;
    } else {
      prompt = `Improve the following web development code:
${request.currentCode}

Return the improved code in the same file format as the original.`;
    }

    const result = await chatSession.sendMessage(prompt);
    const response = result.response.text();

    // Parse the response into separate files
    const files: GeneratedFiles = {};
    
    if (request.mode === 'generate') {
      const htmlMatch = response.match(/---HTML---([\s\S]*?)(?=---CSS---|$)/);
      const cssMatch = response.match(/---CSS---([\s\S]*?)(?=---JS---|$)/);
      const jsMatch = response.match(/---JS---([\s\S]*?)(?=$)/);

      // Helper to clean code blocks
      const cleanCodeBlock = (code: string) => {
        if (!code) return '';
        // Remove markdown code block markers and language identifiers
        let cleaned = code
          .replace(/```(html|css|javascript|js)?\n/g, '')
          .replace(/```\n?/g, '')
          .trim();
        
        // Ensure HTML files use the correct stylesheet link
        if (code.includes('<!DOCTYPE html>') || code.includes('<html>')) {
          cleaned = cleaned.replace(
            /<link[^>]*rel="stylesheet"[^>]*href="[^"]*\.css"[^>]*>/g,
            '<link rel="stylesheet" href="styles.css">'
          );
        }
        return cleaned;
      };

      if (htmlMatch) files.html = cleanCodeBlock(htmlMatch[1]);
      if (cssMatch) files.css = cleanCodeBlock(cssMatch[1]);
      if (jsMatch) files.js = cleanCodeBlock(jsMatch[1]);
    } else {
      // For improve mode, return in the same format as input
      const cleanedCode = response.replace(/```(html|css|javascript|js)?\n/g, '').replace(/```\n?/g, '').trim();
      files[getFileExtension(request.currentCode || '')] = cleanedCode;
    }

    return files;
  } catch (error) {
    console.error('Error generating code:', error);
    throw new Error('Failed to generate code. Please try again.');
  }
}

function getFileExtension(code: string): 'html' | 'css' | 'js' {
  if (code.includes('<!DOCTYPE html>') || code.includes('<html>')) {
    return 'html';
  } else if (code.includes('{') && code.includes('}') && !code.includes('function')) {
    return 'css';
  }
  return 'js';
}
