import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const GPT_MODEL = 'gpt-4o-mini';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, position, highlights, memories } = req.body;

    const prompt = `
    Write a heartfelt goodbye message from ${name}, who is leaving their position as ${position} at the company. The message should include highlights of their achievements: ${highlights}. Mention some beautiful memories: ${memories}. The message should be friendly, appreciative, and personal.
    `;

    try {
      const response = await openai.chat.completions.create({
        model: GPT_MODEL,
        messages: [{ role: 'system', content: prompt }],
      });

      const message = response.choices[0].message?.content?.trim();

      res.status(200).json({ message });
    } catch (error: any) {
      res.status(500).json({ message: 'Error generating message', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
