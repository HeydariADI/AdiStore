import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    return;
  },
  {
    pages: {
      signIn: "/authentication/login",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};