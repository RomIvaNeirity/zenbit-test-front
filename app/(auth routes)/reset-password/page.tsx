"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import css from "../layout.module.css";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (!tokenFromUrl) {
      setMessage("Invalid or missing token");
      return;
    }

    setToken(tokenFromUrl);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!password || !confirmPassword) {
      setMessage("Fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (!token) {
      setMessage("Token missing");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password-confirm`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            newPassword: password,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage("Password updated successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) setMessage(err.message);
      else setMessage("Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className={css.formTitle}>Reset Password</h1>
      <form onSubmit={handleSubmit} className={css.form}>
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
        <input
          className={css.formInputs}
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} className={css.formButton}>
          {loading ? "Updating..." : "Update Password"}
        </button>
        {message && <p className={css.formMessage}>{message}</p>}
      </form>
    </div>
  );
}
