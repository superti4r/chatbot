import { genAI } from "@/lib/gemini"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { message } = await req.json()

  const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" })
  const result = await model.generateContent(message)
  const response = result.response
  const text = response.text()

  return NextResponse.json({ text })
}
