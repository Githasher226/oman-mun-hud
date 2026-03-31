import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { countries, batchIndex } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = `Generate MUN immigration fact sheets for these countries: ${JSON.stringify(countries)}

Context: For Oman's delegation at Model UN, topic is immigration.
Category: "ally" (shares similar immigration stance to Oman, sovereignty-focused, GCC/Arab states), "opposition" (criticizes Gulf labor practices, pushes liberal migration), or "complex" (mixed relationship).

Each country MUST have this exact JSON structure:
{
  "name": "Country Name",
  "category": "ally|opposition|complex",
  "overview": "3-5 detailed sentences about their immigration stance and relationship to Oman's position",
  "keyStats": [{"label": "Total Population", "value": "..."}, {"label": "Foreign-Born Population", "value": "..."}, {"label": "GDP per capita", "value": "..."}, {"label": "Refugees Hosted", "value": "..."}, {"label": "1951 Convention", "value": "Yes/No"}],
  "legalFramework": "Detailed paragraph about immigration laws, asylum system, work permits, whether signatory to 1951 Convention",
  "refugeeAdmissions": "Detailed paragraph about refugee intake numbers, UNHCR presence, resettlement",
  "enforcementPolicies": "Detailed paragraph about border enforcement, deportation, detention practices",
  "militaryDisplacement": "Paragraph about military involvement causing displacement, or N/A if minimal",
  "economicImpact": "Paragraph about economic role of immigration, remittances, labor dependency",
  "hypocrisyIndex": [{"label": "metric", "value": "value"}, ...3-5 items highlighting contradictions],
  "debatePoints": ["Strategic argument 1 for Oman to use", "Argument 2", "Argument 3"],
  "sources": ["Source 1", "Source 2", "Source 3"]
}

Return ONLY a valid JSON array of ${countries.length} objects. No markdown, no explanation.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are an expert MUN researcher. Output ONLY valid JSON arrays. No markdown fences, no extra text. Every response must be a parseable JSON array." },
          { role: "user", content: prompt },
        ],
        stream: false,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("AI error:", response.status, t);
      return new Response(JSON.stringify({ error: `AI error: ${response.status}`, details: t }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || "";
    
    // Strip markdown fences if present
    content = content.trim();
    if (content.startsWith("```")) {
      content = content.split("\n", 1)[1] || content;
      content = content.replace(/```\s*$/, "").trim();
    }

    const sheets = JSON.parse(content);
    
    return new Response(JSON.stringify({ sheets, batchIndex }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
