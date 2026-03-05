"use client";

import { useState } from "react";
import css from "../layout.module.css";

export default function ResetPasswordRequestPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setMessage("Check your email for the reset link.");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className={css.formTitle}>Reset password</h1>
      <form onSubmit={handleSubmit} className={css.form}>
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
        <button type="submit" disabled={loading} className={css.formButton}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      {message && <p className={css.formMessage}>{message}</p>}
    </div>
  );
}
