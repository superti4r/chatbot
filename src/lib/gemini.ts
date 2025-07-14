import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) throw new Error("GEMINI_API_KEY belum diatur")

export const genAI = new GoogleGenerativeAI(apiKey)
