import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/Providers";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Magneto - Unlock Learning, One Day at a Time",
  description:
    "Magneto is an innovative learning platform for high school students in Kenya, providing easy access to quality educational materials at an affordable daily cost. Discover video lessons, notes, and quizzes tailored to your curriculum. Pay only for the days you use and enhance your learning experience with Magneto today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-Poppins font-medium">
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Navbar />
            {children}
            <Footer />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
