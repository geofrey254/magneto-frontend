import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token, // Check if the user is authenticated
  },
});

// Specify which routes to protect
export const config = {
  matcher: ["/Lessons/:path*", "/subjects/:path*"], // Protect all paths under /Lessons and /Subjects
};
