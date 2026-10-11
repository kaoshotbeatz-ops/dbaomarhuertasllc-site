// 1) Gated areas (/whitepapers/*, /obvera/*) are protected by a Cloudflare Access application on the custom domains.
//    Access cannot front *.pages.dev, so never serve those paths from any other hostname.
// 2) Pages 308-redirects /page.html -> /page. The old host (and sitemap.xml) serve /page.html with 200, so serve the
//    extensionless asset under the .html URL to keep every live URL identical. (_routes.json limits this to *.html + gated paths.)
const OK_HOSTS = new Set(["dbaomarhuertasllc.com", "www.dbaomarhuertasllc.com"]);
export async function onRequest(ctx) {
  const url = new URL(ctx.request.url);
  const p = url.pathname;
  if (/^\/(whitepapers|obvera)(\/|$)/i.test(p) && !OK_HOSTS.has(url.hostname)) {
    return new Response("Not found", { status: 404, headers: { "content-type": "text/plain", "x-robots-tag": "noindex" } });
  }
  if (p.endsWith(".html") && !p.endsWith("/index.html") && !p.startsWith("/obvera/") && !p.startsWith("/whitepapers/")) {
    const clean = new URL(url);
    clean.pathname = p.slice(0, -5);
    const r = await ctx.env.ASSETS.fetch(new Request(clean, ctx.request));
    if (r.status === 200) return new Response(r.body, { status: 200, headers: r.headers });
  }
  if (p === "/index.html") {
    const r = await ctx.env.ASSETS.fetch(new Request(new URL("/", url), ctx.request));
    if (r.status === 200) return new Response(r.body, { status: 200, headers: r.headers });
  }
  return ctx.next();
}
