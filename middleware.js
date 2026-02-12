import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // Proteger rutas de admin
  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Proteger rutas de tutor
  if (!token && req.nextUrl.pathname.startsWith("/tutor")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Proteger rutas de student
  if (!token && req.nextUrl.pathname.startsWith("/student")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}