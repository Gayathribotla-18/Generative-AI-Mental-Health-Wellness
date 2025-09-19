import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { messages, sessionId } = await request.json()

    // Verify user authentication
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify session belongs to user
    if (sessionId) {
      const { data: session } = await supabase.from("chat_sessions").select("user_id").eq("id", sessionId).single()

      if (!session || session.user_id !== user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    }

    // System prompt for mental health support
    const systemPrompt = `You are a compassionate AI mental health support assistant designed specifically for young people aged 13-25. Your role is to:

1. Provide emotional support and active listening
2. Offer evidence-based coping strategies and techniques
3. Encourage healthy habits and self-care practices
4. Validate feelings and normalize mental health struggles
5. Recognize when professional help may be needed

Guidelines:
- Be warm, empathetic, and non-judgmental
- Use age-appropriate language for teens and young adults
- Focus on practical, actionable advice
- Encourage professional help for serious concerns (suicidal thoughts, severe depression, etc.)
- Avoid diagnosing or providing medical advice
- Keep responses concise but thorough (2-4 paragraphs max)
- Ask follow-up questions to better understand their situation

If someone expresses suicidal thoughts or self-harm, immediately provide crisis resources:
- Crisis Text Line: Text HOME to 741741
- National Suicide Prevention Lifeline: 988
- Encourage them to reach out to a trusted adult or emergency services

Remember: You're a supportive companion, not a replacement for professional mental health care.`

    // Prepare messages for Groq
    const groqMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ]

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: groqMessages,
      model: "llama-3.1-70b-versatile",
      temperature: 0.7,
      max_tokens: 1000,
    })

    const aiResponse =
      completion.choices[0]?.message?.content ||
      "I'm sorry, I couldn't process that. Could you try rephrasing your message?"

    return NextResponse.json({ message: aiResponse })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "I'm having trouble responding right now. Please try again in a moment." },
      { status: 500 },
    )
  }
}
