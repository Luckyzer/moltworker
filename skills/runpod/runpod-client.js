const API_KEY = process.env.RUNPOD_API_KEY;
const BASE = "https://rest.runpod.io/v1";
const [,, action, podId] = process.argv;

async function call(path, method = "GET") {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return res.json();
}

(async () => {
  if (!API_KEY) { console.error("RUNPOD_API_KEY not set"); process.exit(1); }
  if (action === "list") console.log(JSON.stringify(await call("/pods"), null, 2));
  else if (action === "start") console.log(JSON.stringify(await call(`/pods/${podId}/start`, "POST"), null, 2));
  else if (action === "stop") console.log(JSON.stringify(await call(`/pods/${podId}/stop`, "POST"), null, 2));
  else console.error("Usage: runpod-client.js <list|start|stop> [podId]");
})();
