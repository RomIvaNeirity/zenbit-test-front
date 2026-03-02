import styles from "./OpenDeals.module.css";
import OpenDealsList from "./OpenDealsList/OpenDealsList";

export default function OpenDeals() {
  return (
    <section className={styles.openDeals}>
      <h2 className={styles.openDealsTitle}>Open Deals</h2>
      <div className={styles.openDealsListContainer}>
        <OpenDealsList />
      </div>
    </section>
  );
}
