const API_KEY = process.env.WAVESPEED_API_KEY;
const MODEL = "wavespeed-ai/flux-schnell";
const prompt = process.argv.slice(3).join(" ");

async function submit() {
  const res = await fetch(`https://api.wavespeed.ai/api/v3/${MODEL}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, size: "1024*1024" }),
  });
  const body = await res.json();
  if (body.code !== 200) throw new Error(body.message || "Submission failed");
  return body.data.id;
}

async function poll(id) {
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const res = await fetch(`https://api.wavespeed.ai/api/v3/predictions/${id}/result`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    const body = await res.json();
    if (body.data?.status === "completed") return body.data.outputs;
    if (body.data?.status === "failed") throw new Error("Generation failed");
  }
  throw new Error("Timed out waiting for result");
}

(async () => {
  if (!API_KEY) { console.error("WAVESPEED_API_KEY not set"); process.exit(1); }
  const id = await submit();
  const outputs = await poll(id);
  console.log(JSON.stringify(outputs, null, 2));
})();
