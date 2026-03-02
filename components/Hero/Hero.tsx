import styles from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>The chemical negatively charged</h1>
      <p className={styles.heroDescription}>
        Numerous calculations predict, and experiments confirm, that the force
        field reflects the beam, while the mass defect is not formed. The
        chemical compound is negatively charged. Twhile the mass defect is .
      </p>
      <Link href="/" className={styles.heroButton}>
        Get Started
      </Link>
    </section>
  );
}
