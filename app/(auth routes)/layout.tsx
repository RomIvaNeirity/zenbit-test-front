import styles from "./layout.module.css";
import Link from "next/link";

import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </div>
      </header>
      <div className={styles.wrapper}>
        {/* ЛІВА СТАТИЧНА ФОТКА */}
        <div className={styles.image} />

        {/* ПРАВА ЧАСТИНА — ФОРМИ */}
        <div className={styles.formContainer}>{children}</div>
      </div>
    </>
  );
}
