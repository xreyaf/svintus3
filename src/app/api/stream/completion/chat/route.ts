export const dynamic = 'force-dynamic'

import { type ConversationMessage, chatCompletionModel } from '@/lib/chatCompletionModel'

export async function POST(request: Request) {
  const { messages = [] } = await request.json()
  const encoder = new TextEncoder()

  const customReadable = new ReadableStream({
    async start(controller) {
      const model = chatCompletionModel(controller, encoder)
      await model.invoke(messages.map((m: ConversationMessage) => [m.role, m.content]))
    },
  })

  return new Response(customReadable, {
    headers: {
      Connection: 'keep-alive',
      'Content-Encoding': 'none',
      'Cache-Control': 'no-cache, no-transform',
      'Content-Type': 'text/event-stream; charset=utf-8',
    },
  })
}
