import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req){
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;
    const isSuperuser = req.nextauth.token?.is_superuser;

    //Panel administrador
    if (!token && req.nextUrl.pathname.startsWith("/administrador")) {
      return NextResponse.redirect(new URL("/authentication/login", req.url));
    }

    //panel student
    if (pathname.startsWith("/student") && role !== "students") {
      return Response.redirect(new URL("/authentication/login", req.url));
    }

    //Panel tutor
    if (pathname.startsWith("/tutor") && role !== "tutors") {
      return Response.redirect(new URL("/authentication/login", req.url));
    }
  },
  {
    callbacks:{
      authorized:({ token }) => !!token, // Solo permite el acceso si hay un token válido
    }
  }
);


export const config = {
  matcher: [
    "/administrador/:path*",
    "/student/:path*",
    "/tutor/:path*",
  ],
};