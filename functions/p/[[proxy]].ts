import { Env } from "$/env";

export const onRequest: PagesFunction<Env> = ({ request }) => {
  const parsed = new URL(request.url);
  const host = parsed.pathname.slice(3, parsed.pathname.indexOf("/", 3));
  const pathname = parsed.pathname.slice(host.length + 3);
  if (
    host !== "telegram.org" &&
    !host.endsWith("cdn-telegram.org") &&
    !(host.endsWith("telegra.ph") && pathname.startsWith("/file/"))
  ) {
    return new Response(null, { status: 403 });
  }
  return fetch(`https://${host}/${pathname}`, {
    headers: request.headers,
  });
};
