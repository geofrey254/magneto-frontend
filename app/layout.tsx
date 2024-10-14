import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const poppinsThin = localFont({
  src: "../styles/fonts/Poppins-Thin.ttf",
  variable: "--font-poppins-thin",
});
export const poppinsReg = localFont({
  src: "../styles/fonts/Poppins-Regular.ttf",
  variable: "--font-poppins-regular",
  weight: "800",
});

export const poppinsMed = localFont({
  src: "../styles/fonts/Poppins-Medium.ttf",
  variable: "--font-poppins-medium",
  weight: "800",
});

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
      <body className={poppinsReg.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
