import { NextResponse } from 'next/server';

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
// Using facebook/blenderbot-400M-distill as it's a good chatbot model
const API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Debug log
    console.log('API Key available:', !!HUGGING_FACE_API_KEY);
    console.log('API Key length:', HUGGING_FACE_API_KEY?.length);
    console.log('API Key preview:', HUGGING_FACE_API_KEY?.slice(0, 5));

    if (!HUGGING_FACE_API_KEY) {
      return NextResponse.json(
        { error: 'Hugging Face API key not configured' },
        { status: 500 }
      );
    }

    // Log the full request details (except the full API key)
    console.log('Making request to:', API_URL);
    console.log('Request headers:', {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${HUGGING_FACE_API_KEY?.slice(0, 5)}...`,
    });
    console.log('Request body:', { inputs: message });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: message }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        headers: Object.fromEntries(response.headers.entries())
      });
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json({ 
      response: result[0].generated_text 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
