// /functions/auth.js  ->  served at /auth
// Redirects to GitHub's OAuth authorize screen.

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const redirectUri = `${url.origin}/callback`;

  const githubAuthUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=repo`;

  return Response.redirect(githubAuthUrl, 302);
}
