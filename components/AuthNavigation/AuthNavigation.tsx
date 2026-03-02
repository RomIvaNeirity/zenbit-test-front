"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import css from "./AuthNavigation.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export default function AuthNavigation() {
  const [user, setUser] = useState<null | { id: number; email: string }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Перевіряємо чи користувач залогінений
    fetch(`${BASE_URL}/auth/me`, {
      credentials: "include",
      cache: "no-store", // щоб кукі відправилися
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch(`${BASE_URL}/auth/logout`, {
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
              Log Out
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
