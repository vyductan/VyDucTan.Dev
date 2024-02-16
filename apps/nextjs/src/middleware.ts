import type { NextRequest } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "vi"],
  defaultLocale: "en",
});

export function middleware(request: NextRequest) {
  // To get current url in server side
  const response = I18nMiddleware(request);
  response.headers.set("x-url", request.url);
  return response;
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
