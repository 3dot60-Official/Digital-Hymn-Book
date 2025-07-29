import { GoogleGenAI, Type } from "@google/genai";
import type { Handler } from "@netlify/functions";
import { Category, GeneratedHymn, Language, Inspiration } from "../../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const genericApiError = "There was an error connecting to the AI service. Please try again later.";

const generateInspiration = async (category: Category | 'general', language: Language): Promise<Inspiration> => {
  const prompt = `Write a short, uplifting, and inspirational devotional text (around 100 words) suitable for a church congregation, written in the language with code "${language}". The theme should be related to "${category}". The tone should be hopeful and encouraging. Also, provide a relevant Bible verse (e.g., "John 3:16") that complements the devotional text.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      temperature: 0.7,
      topP: 1,
      topK: 32,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
            inspirationalText: { type: Type.STRING },
            bibleVerse: { type: Type.STRING }
        },
        required: ["inspirationalText", "bibleVerse"]
      },
    },
  });
  const jsonString = response.text.trim();
  return JSON.parse(jsonString) as Inspiration;
};

const generateHymn = async (topic: string, language: Language): Promise<GeneratedHymn> => {
  const prompt = `Generate a 4-verse church hymn based on the topic: "${topic}", written in the language with code "${language}". The hymn must include a suitable title. The lyrics should have a traditional structure (e.g., AABB or ABAB rhyme scheme) and use language appropriate for congregational singing. Focus on themes of faith, hope, and worship. Each verse should be separated by a double newline.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          lyrics: { type: Type.STRING },
        },
        required: ["title", "lyrics"],
      },
    },
  });
  const jsonString = response.text.trim();
  return JSON.parse(jsonString) as GeneratedHymn;
};

const translate = async (textToTranslate: string, targetLanguage: string, sourceLanguage: string = 'en'): Promise<string> => {
    const prompt = `Translate the following text from ${sourceLanguage} to the language with ISO 639-1 code "${targetLanguage}". Provide only the translated text, without any introductory phrases or explanations.\n\nText to translate:\n"""\n${textToTranslate}\n"""`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.2,
            maxOutputTokens: 2048,
            thinkingConfig: { thinkingBudget: 1024 },
        },
    });

    return response.text.trim();
}

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    if (!process.env.API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: "AI features are not configured for this application." }) };
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const { action, payload } = body;

        let result;

        if (action === 'generateInspiration') {
            const { category, language } = payload;
            result = await generateInspiration(category, language);
        } else if (action === 'generateHymn') {
            const { topic, language } = payload;
            result = await generateHymn(topic, language);
        } else if (action === 'translate') {
            const { textToTranslate, targetLanguage, sourceLanguage } = payload;
            result = await translate(textToTranslate, targetLanguage, sourceLanguage);
        } else {
             return { statusCode: 400, body: JSON.stringify({ error: 'Invalid action' }) };
        }

        return { statusCode: 200, body: JSON.stringify({ result }) };

    } catch (error) {
        console.error('Error in Gemini Netlify function:', error);
        if (error instanceof Error) {
            return { statusCode: 500, body: JSON.stringify({ error: error.message || genericApiError }) };
        }
        return { statusCode: 500, body: JSON.stringify({ error: genericApiError }) };
    }
};