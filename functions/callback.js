// /functions/callback.js  ->  served at /callback
// Exchanges GitHub's code for an access token, hands it back to Decap.

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    return new Response("GitHub auth failed", { status: 401 });
  }

  const payload = JSON.stringify({ token: tokenData.access_token, provider: "github" });

  const html = `<!doctype html>
<html><body>
<script>
  (function() {
    function receiveMessage() {
      window.opener.postMessage(
        'authorization:github:success:${payload}',
        "*"
      );
      window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script>
</body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
