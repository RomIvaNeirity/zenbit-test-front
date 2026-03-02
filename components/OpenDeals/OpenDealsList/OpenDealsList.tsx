"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Deal } from "@/types/deal";
import styles from "./OpenDealsList.module.css";

export default function DealsList() {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(
          "https://zenbit-test-back.onrender.com/deals",
        );
        setDeals([...response.data].sort((a, b) => a.id - b.id));
        console.log("Fetched deals:", response.data);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };
    fetchDeals();
  }, []);

  return (
    <>
      <ul className={styles.openDealList}>
        {deals.map((deal) => (
          <li
            className={styles.openDealListItem}
            key={deal.id}
            style={{ backgroundImage: `url(${deal.imageUrl})` }}
          >
            <div className={styles.dealInfo}>
              <h3 className={styles.openDealTitle}>{deal.title}</h3>
              <p className={styles.dealPrice}>Price: ${deal.price} Dhs</p>

              <p className={styles.dealYield}>Yield: {deal.yield}%</p>
              <p className={styles.dealSold}>Sold: {deal.soldPercent}%</p>
              <p className={styles.dealTiket}>Tiket - {deal.tiket} Dhs</p>
              <p className={styles.dealDaysLeft}>Days left: {deal.daysLeft}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
