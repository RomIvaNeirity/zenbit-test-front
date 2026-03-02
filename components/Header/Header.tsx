"use client";
import css from "./Header.module.css";

import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.logo}>My Logo</div>
      <AuthNavigation />
    </header>
  );
}
