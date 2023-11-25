import { OpenAIApi, Configuration } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function GET(req) {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: 'Dime que tan inutil soy'
      },
      {
        role: 'user',
        content: 'No me sale nada bien'
      }
    ]
  });

  const stream = new OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
