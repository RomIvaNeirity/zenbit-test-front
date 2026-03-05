"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const [user, setUser] = useState<null | { id: number; email: string }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me", {
      credentials: "include",
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  };

  if (loading) return null;

  return (
    <nav aria-label="Main Navigation">
      <ul className={css.navigation}>
        {user ? (
          <li>
            <button onClick={handleLogout} className={css.logoutButton}>
              Sign Out
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link href="/login">Log In</Link>
            </li>
            <li>
              <Link href="/register">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
