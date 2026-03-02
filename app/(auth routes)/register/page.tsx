"use client";

import styles from "../layout.module.css";
import { useState } from "react";
/*
export default function RegisterForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log("Email:", form.email.value);
    console.log("Password:", form.password.value);
  };

  return (
    <>
      <h1 className={styles.formTitle}>Sign Up</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
 */

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://zenbit-test-back.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Register</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className={styles.error}>{error}</p>}

      <button disabled={loading}>{loading ? "Loading..." : "Sign up"}</button>
    </form>
  );
}
