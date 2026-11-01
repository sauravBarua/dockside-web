"use client";

import { useActionState } from "react";
import { loginAction, registerAction } from "@/app/actions/auth";
import type { FormState } from "@/lib/types";

const initialState: FormState = {};

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";
  const [state, formAction, pending] = useActionState(
    isRegister ? registerAction : loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="form">
      {isRegister && (
        <label>
          Name
          <input name="name" type="text" required maxLength={100} autoComplete="name" />
        </label>
      )}
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          required
          minLength={isRegister ? 8 : 1}
          maxLength={72}
          autoComplete={isRegister ? "new-password" : "current-password"}
        />
      </label>
      {state.error && (
        <p className="error" role="alert">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending}>
        {pending ? "Please wait…" : isRegister ? "Create account" : "Log in"}
      </button>
    </form>
  );
}