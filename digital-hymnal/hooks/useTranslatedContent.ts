import { useState, useEffect, useContext } from 'react';
import { Language } from '../types';
import { LanguageContext } from '../context/LanguageContext';
import { translateText } from '../services/geminiService';

const translationCache: Record<string, string> = {};

export const useTranslatedContent = (
  originalContent: { [key in Language]?: string } | undefined,
  englishFallback: string
) => {
  const { language } = useContext(LanguageContext);
  const [translatedText, setTranslatedText] = useState(englishFallback);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!originalContent) {
        setTranslatedText(englishFallback);
        return;
    }
    
    const effectiveEnglish = originalContent.en || englishFallback;

    if (language === Language.English) {
      setTranslatedText(effectiveEnglish);
      return;
    }

    if (originalContent[language]) {
      setTranslatedText(originalContent[language]!);
      return;
    }

    const cacheKey = `${language}:${effectiveEnglish}`;
    if (translationCache[cacheKey]) {
        setTranslatedText(translationCache[cacheKey]);
        return;
    }

    const fetchTranslation = async () => {
      setIsLoading(true);
      try {
        const result = await translateText(effectiveEnglish, language);
        if (result) {
            translationCache[cacheKey] = result;
            setTranslatedText(result);
        } else {
            setTranslatedText(effectiveEnglish);
        }
      } catch (error) {
        console.error("Translation hook error:", error);
        setTranslatedText(effectiveEnglish);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslation();
  }, [originalContent, language, englishFallback]);

  return { text: translatedText, isLoading };
};
