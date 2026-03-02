"use client";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.logo}>My Logo</div>
      <div className={css.email}>neirity@gmail.com</div>
    </footer>
  );
}
