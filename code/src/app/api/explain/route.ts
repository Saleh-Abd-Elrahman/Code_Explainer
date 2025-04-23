import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Use the configured model or fall back to default
    const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
    
    // Using streamText from Vercel AI SDK
    const result = await streamText({
      model: openai(model),
      messages,
      system: 'You are a coding expert who explains code in a clear, concise manner. Your explanations should be easy to understand for junior developers while still being technically accurate. Break down the code into logical sections and explain the purpose and functionality of each part. Focus on explaining how the code works, any advanced techniques used, and potential optimizations.',
    });
    
    // Return the stream response
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response('Error processing request', { status: 500 });
  }
} 