import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import cache from '@/lib/upstashCache'

export type ConversationMessage = {
  role: 'user' | 'assistant'
  content: string
}

export type ConversationMessages = ConversationMessage[]

export const chatCompletionModel = (
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
) => {
  return new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash',
    maxOutputTokens: 2048,
    cache,
    apiKey: process.env.GOOGLE_API_KEY,
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken(token: string) {
          controller.enqueue(encoder.encode(`${token}`))
        },
        handleLLMEnd() {
          controller.close()
        },
        handleLLMError(err) {
          console.error(err)
          controller.error(err)
        },
      },
    ],
  })
}
