import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";

import { auth } from "@vyductan/api/auth";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "vi"],
  defaultLocale: "en",
  urlMappingStrategy: "rewriteDefault",
});
export async function middleware(req: NextRequest) {
  const nextUrl = req.nextUrl;

  /**
   * Rewrite URL
   */
  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers
    .get("host")!
    .replace(
      `.localhost:${process.env.PORT ?? 3000}`,
      `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    );

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${nextUrl.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // rewrites for app pages
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    /**
     * I18n auto set lang path
     * only for app.* domain
     */
    const i18nResponse = I18nMiddleware(req);
    // To get current url in server side
    i18nResponse.headers.set("x-url", req.url);
    // Temporary redirect (no need add local when NextResponse.(redirect|rewrite))
    if (i18nResponse.status === 307) {
      return i18nResponse;
    }

    const session = await auth();
    if (!session && !path.includes("/signin")) {
      const redirectUrl = new URL("/signin", req.url);
      redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
      return NextResponse.redirect(redirectUrl);
    } else if (session && path.includes("/signin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite root application to `/home` folder
  if (
    hostname === `localhost:${process.env.PORT ?? 3000}` ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}

export const config = {
  /*
   * Match all paths except for:
   * 1. /api routes
   * 2. /_next (Next.js internals)
   * 3. /_static (inside /public)
   * 4. all root files inside /public (e.g. /favicon.ico)
   */
  matcher: ["/((?!api/|_next/|_static/|_vercel/|[\\w-]+\\.\\w+).*)"],
};
