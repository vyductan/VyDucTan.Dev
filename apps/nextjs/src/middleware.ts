import type { NextRequest } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";

import { auth } from "@vyductan/api/auth";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "vi"],
  defaultLocale: "en",
});

export async function middleware(request: NextRequest) {
  const response = auth((req) => {
    // To get current url in server side
    const i18nResponse = I18nMiddleware(req);
    i18nResponse.headers.set("x-url", req.url);
    return i18nResponse;
  })(request, {});
  return response;
}

export const config = {
  matcher: ["/((?!api|static|_next|image|favicon.ico).*)"],
};
