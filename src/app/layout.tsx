import type { Metadata } from "next";
import Link from "next/link";
import { logoutAction } from "./actions/auth";
import { getToken } from "@/lib/session";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dockside",
  description: "A mini blog used to practice Docker, Nginx and CI/CD on AWS.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const signedIn = Boolean(await getToken());

  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="inner">
            <Link href="/" className="brand">
              Dockside
            </Link>
            <nav aria-label="Account" className="site-nav">
              {signedIn ? (
                <>
                  <Link href="/dashboard">Dashboard</Link>
                  <form action={logoutAction}>
                    <button type="submit" className="link-button">
                      Log out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login">Log in</Link>
                  <Link href="/register">Register</Link>
                </>
              )}
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}