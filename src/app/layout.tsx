import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dockside",
  description: "A mini blog used to practice Docker, Nginx and CI/CD on AWS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="inner">
            <Link href="/">Dockside</Link>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}