
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types.ts";

export const getFinancialAdvice = async (transactions: Transaction[], query: string) => {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : null;

  if (!apiKey) {
    return "AI Insights are currently unavailable (Missing API Key). Please configure your environment.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const summary = transactions.map(t => `${t.title}: ₹${t.amount} (${t.category})`).join(', ');
    const prompt = `
      You are KyanPay Smart Assistant. Your goal is to provide elite financial insights to the user based on their transaction history.
      
      Transaction History:
      ${summary}
      
      User Query: ${query}
      
      Response Requirements:
      - Be professional, modern, and data-driven.
      - Use Indian Rupee (INR) currency.
      - Format with markdown (bold, lists).
      - Keep response under 100 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, KyanPay AI is experiencing a network lag. Please try again in a moment.";
  }
};