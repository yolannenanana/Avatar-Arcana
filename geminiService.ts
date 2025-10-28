import { GoogleGenAI, Modality } from "@google/genai";

// FIX: Initialize GoogleGenAI client directly with process.env.API_KEY as per the guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Converts a base64 encoded image and a text prompt into a new fantasy character image.
 * @param base64Data The base64 encoded image data (without the data: prefix).
 * @param mimeType The MIME type of the image (e.g., 'image/jpeg').
 * @param prompt The text prompt to guide the image generation.
 * @returns A promise that resolves to the base64 encoded string of the generated image.
 */
export async function transformImageToFantasy(
  base64Data: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    throw new Error("No se encontraron datos de imagen en la respuesta de la API de Gemini.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("No se pudo generar la imagen con la API de Gemini.");
  }
}