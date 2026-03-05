"use client";

import css from "../layout.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className={css.formTitle}>Sign Up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
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
        <button className={css.formButton}>Register</button>
        <p className={css.signUpRemainder}>
          Do youb have account?{"  "}
          <Link href="/login" className={css.signUpLink}>
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
