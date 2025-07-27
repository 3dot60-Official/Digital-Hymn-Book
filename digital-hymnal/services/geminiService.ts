import { GoogleGenAI, Type } from "@google/genai";
import { Category, GeneratedHymn, Language } from "../types";

// As per guidelines, API key is read from process.env.API_KEY and is assumed to be present.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const genericApiError = "There was an error connecting to the AI service. Please try again later.";
const featureUnavailableError = "AI features are not configured for this application.";

export const generateInspiration = async (category: Category | 'general', language: Language): Promise<string> => {
  const prompt = `Write a short, uplifting, and inspirational devotional text (around 100 words) suitable for a church congregation, written in the language with code "${language}". The theme should be related to "${category}". The tone should be hopeful and encouraging. Do not include a title.`;
  
  try {
    // The API key is assumed to be set. If not, this call will fail and be caught.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 1,
        topK: 32,
        maxOutputTokens: 200,
        thinkingConfig: { thinkingBudget: 100 },
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating inspiration from Gemini API:", error);
    // Check for API key in the catch block to provide a more specific error message.
    if (!process.env.API_KEY) {
        return featureUnavailableError;
    }
    return genericApiError;
  }
};

export const generateHymn = async (topic: string, language: Language): Promise<GeneratedHymn> => {
  const prompt = `Generate a 4-verse church hymn based on the topic: "${topic}", written in the language with code "${language}". The hymn must include a suitable title. The lyrics should have a traditional structure (e.g., AABB or ABAB rhyme scheme) and use language appropriate for congregational singing. Focus on themes of faith, hope, and worship. Each verse should be separated by a double newline.`;

  try {
    // The API key is assumed to be set. If not, this call will fail and be caught.
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
  } catch (error) {
    console.error("Error generating hymn lyrics from Gemini API:", error);
    // Check for API key in the catch block to provide a more specific error message.
    if (!process.env.API_KEY) {
        return { title: "Error", lyrics: featureUnavailableError };
    }
    return { title: "Error", lyrics: genericApiError };
  }
};

export const searchAndGenerateHymn = async (searchTerm: string, language: Language): Promise<GeneratedHymn> => {
    return generateHymn(searchTerm, language);
};
