import { onAuthStateChanged } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../firebase_app";

export function middleware(request: NextRequest) {
  onAuthStateChanged(auth, (user) => {
    console.log("from middleware", user?.uid);
    if(!user || user === undefined) return NextResponse.redirect(new URL("/", request.url));
  })
}

export const config = {
  matcher: "/todo/:path*",
}
