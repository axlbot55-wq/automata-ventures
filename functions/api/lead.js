export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const webhookUrl = context.env.LEAD_WEBHOOK_URL;
    const webhookBearer = context.env.LEAD_WEBHOOK_BEARER;

    if (!body?.lead) {
      return json({ ok: false, error: "missing_lead" }, 400);
    }

    const payload = {
      source: "automata-ventures-website",
      capturedAt: new Date().toISOString(),
      page: body.page || "/",
      lead: body.lead,
      history: Array.isArray(body.history) ? body.history.slice(-12) : []
    };

    if (!webhookUrl) {
      return json({ ok: true, forwarded: false, reason: "no_webhook_configured" });
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(webhookBearer ? { Authorization: `Bearer ${webhookBearer}` } : {})
      },
      body: JSON.stringify(payload)
    });

    return json({ ok: response.ok, forwarded: response.ok, status: response.status });
  } catch (error) {
    return json({ ok: false, error: "lead_handler_failed" }, 500);
  }
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
