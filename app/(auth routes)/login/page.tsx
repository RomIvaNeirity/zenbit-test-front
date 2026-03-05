"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "../layout.module.css";
import Link from "next/link";

/* const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://zenbit-test-back.onrender.com"; */

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }

    console.log(res);

    router.push("/");
    router.refresh();
  };

  return (
    <>
      <h1 className={css.formTitle}>Login</h1>
      <form className={css.form} onSubmit={submit}>
        <label htmlFor="email" className={css.formLabels}>
          Email
        </label>
        <input
          className={css.formInputs}
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className={css.formLabels}>
          Password
        </label>
        <input
          className={css.formInputs}
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Link href="/reset-password-request" className={css.resetPasswordLink}>
          Forgot password?
        </Link>
        {error && <p>{error}</p>}
        <button className={css.formButton}>Sign In</button>
        <p className={css.signUpRemainder}>
          Do not have account?{"  "}
          <Link href="/register" className={css.signUpLink}>
            Sing Up
          </Link>
        </p>
      </form>
    </>
  );
}
