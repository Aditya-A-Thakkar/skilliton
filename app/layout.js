import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import PrimarySearchAppBar from '@/components/PrimarySearchAppBar';
import RequireAuth from "@/components/RequireAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div
          style={{
            display: 'flex',           
            flexDirection: 'column',   
            minHeight: '100vh',        
          }}
        >
        <RequireAuth>

          <PrimarySearchAppBar />
          <div style={{ height: '64px' }} />
            {children}

          <Footer />
        </RequireAuth>
        </div>
      </body>
    </html>
  );
}
