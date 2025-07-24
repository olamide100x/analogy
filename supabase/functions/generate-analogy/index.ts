import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { thing1, thing2 } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    if (!thing1 || !thing2) {
      throw new Error('Both thing1 and thing2 are required');
    }

    console.log(`Generating analogy between "${thing1}" and "${thing2}"`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Write a short, witty analogy between the two concepts. Keep it under 25 words. Use pop culture references, irony, or wordplay. Be clever enough to go viral on Twitter. Avoid em dashes. Use plain punctuation. Format: "X is like Y because [funny or surprising punchline]."'
          },
          {
            role: 'user',
            content: `Create an analogy between "${thing1}" and "${thing2}". Explain how they are similar in an interesting and creative way.`
          }
        ],
        max_tokens: 150,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const analogy = data.choices[0].message.content;

    console.log('Generated analogy:', analogy);

    return new Response(JSON.stringify({ analogy }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-analogy function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});