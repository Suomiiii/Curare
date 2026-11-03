// netlify/functions/chatbot.js
// Netlify serverless function to securely call AI backends.

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { message } = await req.json();

    // --- MOCK RESPONSE (Default for immediate testing) ---
    const lowerMsg = String(message || "").toLowerCase();
    let reply = "I'm your Help Desk AI! I can help you reset passwords, route tickets, and troubleshoot.";
    if (lowerMsg.includes("password")) reply = "To reset a password, please go to the admin portal under 'Security' and send a reset link to the user.";
    if (lowerMsg.includes("ticket") || lowerMsg.includes("status")) reply = "You can view ticket statuses in the 'Queue' tab. I can also help classify them for you.";

    // --- REAL API EXAMPLE (Uncomment to use a real model via Netlify AI Gateway) ---
    /*
    // OPENAI_API_KEY and OPENAI_BASE_URL are injected automatically by Netlify AI Gateway.
    const response = await fetch(`${process.env.OPENAI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an IT Help Desk AI." },
          { role: "user", content: message }
        ]
      })
    });
    const data = await response.json();
    reply = data.choices[0].message.content;
    */

    return Response.json({ reply });
  } catch (error) {
    return Response.json({ error: "Server Error", details: error.toString() }, { status: 500 });
  }
};
