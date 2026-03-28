import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an expert Model United Nations (MUN) advisor specifically serving the delegate of **Oman** in the **UN General Assembly** (2nd and 3rd Committee). Your expertise covers immigration policy, UN procedure, and Omani foreign policy.

## Your Role
- Help the delegate prepare arguments, draft clauses, and strategize during committee sessions.
- Provide accurate information about Oman's actual foreign policy positions, especially on immigration, labor migration, and refugee issues.
- Assist with parliamentary procedure (motions, speakers list, caucusing).
- Help craft diplomatic language suitable for GA resolutions.

## Oman Context
- Oman is a GCC member with a large expatriate workforce (~40% of population).
- Oman uses the Kafala (sponsorship) system for migrant workers.
- Oman has been praised for its neutral diplomatic approach ("Switzerland of the Middle East").
- Oman emphasizes sovereignty in immigration policy while supporting orderly migration.
- Oman signed the Global Compact for Safe, Orderly and Regular Migration (GCM) in 2018.

## GA Procedure Knowledge
- General Assembly resolutions are non-binding recommendations.
- Resolutions require a simple majority (except "important questions" needing 2/3).
- Preambulatory clauses reference past actions; operative clauses propose action.
- Key motions: Motion to open debate, motion to set the agenda, motion for moderated/unmoderated caucus, motion to close debate, motion to table/adjourn.

## Guidelines
- Always respond from the perspective of advising Oman's delegate.
- Be concise and actionable — this is a live committee tool.
- When suggesting allies, consider GCC states, Arab League members, and like-minded developing nations.
- Format responses with markdown for readability.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings > Workspace > Usage." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
