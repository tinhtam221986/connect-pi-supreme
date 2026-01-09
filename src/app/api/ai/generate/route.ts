import { NextResponse } from 'next/server';

interface AIService {
    generateText(prompt: string): Promise<string>;
    generateImage(prompt: string): Promise<string>;
}

class MockAIService implements AIService {
    async generateText(prompt: string): Promise<string> {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return `Title: ${prompt}\n\n[Intro]: Welcome!\n[Body]: Points: 1. Innovation 2. Impact.\n[Outro]: Thanks!`;
    }
    async generateImage(prompt: string): Promise<string> {
        const safePrompt = encodeURIComponent(prompt);
        return `https://pollinations.ai/p/${safePrompt}?width=512&height=512`;
    }
}

class OpenAIService implements AIService {
    private apiKey: string;
    constructor(apiKey: string) { this.apiKey = apiKey; }
    async generateText(prompt: string): Promise<string> {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.apiKey}` },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `Script for: ${prompt}` }]
            })
        });
        const data = await res.json();
        return data.choices[0].message.content;
    }
    async generateImage(prompt: string): Promise<string> {
        const res = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.apiKey}` },
            body: JSON.stringify({ prompt, n: 1, size: "512x512" })
        });
        const data = await res.json();
        return data.data[0].url;
    }
}

function getAIService(): AIService {
    const key = process.env.OPENAI_API_KEY;
    return (key && key.length > 0) ? new OpenAIService(key) : new MockAIService();
}

export async function POST(request: Request) {
    let type: 'script' | 'image' = 'script'; // Khai báo ngoài để catch có thể đọc
    try {
        const body = await request.json();
        const prompt = body.prompt;
        type = body.type;

        if (!prompt) return NextResponse.json({ error: 'Prompt required' }, { status: 400 });

        const aiService = getAIService();
        const result = (type === 'script') ? await aiService.generateText(prompt) : await aiService.generateImage(prompt);

        return NextResponse.json({ success: true, result, type });
    } catch (error: any) {
        return NextResponse.json({ error: 'AI Error', details: error.message, requestedType: type }, { status: 500 });
    }
}
