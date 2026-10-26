import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Matche UNIQUEMENT :
     * - /admin/* SAUF /admin/login
     * - /api/admin/*
     */
    "/admin/((?!login).*)",
    "/api/admin/:path*",
  ],
};