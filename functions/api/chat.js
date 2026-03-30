export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const message = String(body?.message || "").trim();
    const lead = body?.lead || {};

    const fallback = buildFallbackReply(message, lead);

    const apiKey = context.env.LLM_API_KEY;
    const baseUrl = context.env.LLM_BASE_URL || "https://api.openai.com/v1/chat/completions";
    const model = context.env.LLM_MODEL || "gpt-4o-mini";

    if (!apiKey || !message) {
      return json(fallback);
    }

    const systemPrompt = [
      "You are the Automata Ventures website concierge.",
      "Write in a polished, concise, premium tone for real estate agencies.",
      "Your job is to explain the offer, qualify agency leads, and move good prospects toward a demo or follow-up.",
      "Current starter pricing is AUD 900 setup and AUD 250 per month.",
      "Do not invent case studies, integrations, guarantees, or unsupported claims.",
      "Keep responses short and commercially sharp.",
      "Ask one strong next question when useful.",
      "Return valid JSON only."
    ].join(" ");

    const llmPayload = {
      model,
      temperature: 0.5,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: JSON.stringify({
            task: "Reply to the website visitor and update any lead fields you can infer.",
            message,
            knownLead: lead,
            outputSchema: {
              reply: "string",
              lead: {
                role: "string|null",
                agency: "string|null",
                leadVolume: "string|null",
                useCase: "string|null",
                email: "string|null",
                intentLevel: "low|medium|high"
              },
              nextAction: "string"
            }
          })
        }
      ]
    };

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(llmPayload)
    });

    if (!response.ok) {
      return json(fallback);
    }

    const raw = await response.json();
    const content = raw?.choices?.[0]?.message?.content;
    const parsed = typeof content === "string" ? JSON.parse(content) : content;

    return json({
      reply: parsed?.reply || fallback.reply,
      lead: {
        role: parsed?.lead?.role ?? lead.role ?? "",
        agency: parsed?.lead?.agency ?? lead.agency ?? "",
        leadVolume: parsed?.lead?.leadVolume ?? lead.leadVolume ?? "",
        useCase: parsed?.lead?.useCase ?? lead.useCase ?? "",
        email: parsed?.lead?.email ?? lead.email ?? "",
        intentLevel: parsed?.lead?.intentLevel || lead.intentLevel || "medium"
      },
      nextAction: parsed?.nextAction || fallback.nextAction
    });
  } catch (error) {
    return json(buildFallbackReply("", {}));
  }
}

function buildFallbackReply(message, lead) {
  const value = String(message || "").toLowerCase();

  if (value.includes("price") || value.includes("pricing") || value.includes("cost")) {
    return {
      reply: "The current starter pack is positioned at AUD 900 setup and AUD 250 per month. If you want a broader rollout with extra channels or integrations, the scope depends on workflow complexity and lead volume.",
      lead,
      nextAction: "ask_fit"
    };
  }

  if (value.includes("demo") || value.includes("book") || value.includes("call")) {
    return {
      reply: "Happy to help with that. What’s your role, and are you mainly looking for website chat only or a broader lead-handling workflow?",
      lead,
      nextAction: "ask_role"
    };
  }

  if (value.includes("agency") || value.includes("fit") || value.includes("team")) {
    return {
      reply: "It’s aimed at boutique and growth-focused agencies that want faster response times, cleaner qualification, and better after-hours lead handling. Roughly how many inbound enquiries does your team handle in a typical month?",
      lead,
      nextAction: "ask_volume"
    };
  }

  return {
    reply: "Happy to help. If you want, tell me your role, agency type, and whether you’re looking for website chat only or a broader lead-handling workflow, and I’ll point you in the right direction.",
    lead,
    nextAction: "ask_role"
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
