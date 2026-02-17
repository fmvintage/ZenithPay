
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types.ts";

export const getFinancialAdvice = async (transactions: Transaction[], query: string) => {
  // Check for API key inside the function to avoid top-level ReferenceErrors
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : null;

  if (!apiKey) {
    return "AI Insights are currently unavailable (Missing API Key). Please configure your environment.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const summary = transactions.map(t => `${t.title}: ₹${t.amount} (${t.category})`).join(', ');
    const prompt = `
      You are ZenithPay Smart Assistant. Here is the recent transaction history of the user:
      ${summary}
      
      User asks: ${query}
      
      Give a concise, helpful, and professional financial response in Indian Rupees (INR). Use markdown. Keep it under 100 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble analyzing your finances right now. Please try again later.";
  }
};
