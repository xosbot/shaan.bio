export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, org, email, type, message } = req.body || {};

  if (!name || !org || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (message.trim().length < 10) {
    return res.status(400).json({ error: "Message too short" });
  }

  const submission = {
    name,
    org,
    email,
    type: type || "investor",
    message,
    received_at: new Date().toISOString(),
    source: "shaan.bio",
  };

  console.log("CONTACT_FORM_SUBMISSION:", JSON.stringify(submission, null, 2));

  return res.status(200).json({ ok: true });
}
