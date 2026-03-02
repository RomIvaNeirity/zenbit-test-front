"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Перевіряємо чи користувач залогінений
    fetch("https://zenbit-test-back.onrender.com/auth/me", {
      credentials: "include", // щоб кукі відправилися
    })
      .then((res) => {
        if (res.ok) setIsAuthenticated(true);
        else setIsAuthenticated(false);
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleLogout = async () => {
    await fetch("https://zenbit-test-back.onrender.com/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
  };

  return (
    <nav aria-label="Main Navigation">
      <ul className={css.navigation}>
        {isAuthenticated ? (
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
