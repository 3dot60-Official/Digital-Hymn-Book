import { Category, GeneratedHymn, Language, Inspiration } from "../types";

const genericApiError = "There was an error connecting to the AI service. Please try again later.";

async function callGeminiFunction(action: string, payload: any) {
    try {
        const response = await fetch('/.netlify/functions/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action, payload }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || genericApiError);
        }

        return data.result;
    } catch (error) {
        console.error(`Error calling Gemini function for action "${action}":`, error);
        throw error; // Re-throw to be caught by calling function
    }
}

export const generateInspiration = async (category: Category | 'general', language: Language): Promise<Inspiration> => {
  try {
    return await callGeminiFunction('generateInspiration', { category, language });
  } catch(error: any) {
    // Return error object, maintaining original function signature
    return { 
        inspirationalText: error.message || genericApiError, 
        bibleVerse: '' 
    };
  }
};

export const generateHymn = async (topic: string, language: Language): Promise<GeneratedHymn> => {
  try {
      const result = await callGeminiFunction('generateHymn', { topic, language });
      return result;
  } catch(error: any) {
      // Return error object, maintaining original function signature
      return { title: "Error", lyrics: error.message || genericApiError };
  }
};

export const translateText = async (
  textToTranslate: string, 
  targetLanguage: Language, 
  sourceLanguage: Language = Language.English
): Promise<string> => {
  try {
    return await callGeminiFunction('translate', { textToTranslate, targetLanguage, sourceLanguage });
  } catch(error: any) {
    console.error("Translation failed:", error);
    return textToTranslate; // Fallback to original text on error
  }
};

export const searchAndGenerateHymn = async (searchTerm: string, language: Language): Promise<GeneratedHymn> => {
    return generateHymn(searchTerm, language);
};