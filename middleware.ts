import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Ne matche QUE :
     * - /admin/*
     * - /api/admin/*
     */
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};