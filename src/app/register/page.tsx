import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() {
  return (
    <>
      <h1>Create an account</h1>
      <AuthForm mode="register" />
      <p>
        Already registered? <Link href="/login">Log in</Link>
      </p>
    </>
  );
}
