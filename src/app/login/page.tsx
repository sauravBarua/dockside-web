import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <>
      <h1>Log in</h1>
      <AuthForm mode="login" />
      <p>
        No account yet? <Link href="/register">Register</Link>
      </p>
    </>
  );
}
