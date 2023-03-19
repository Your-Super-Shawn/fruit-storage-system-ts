import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, { useState, useEffect } from "react";
import FruitTable from "@/components/FruitTable";
import PageTitle from "@/components/PageTitle";
import PageHead from "@/components/PageHead";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.container}>
      <PageHead pageTitle={"Fruit Storage Playground"} />
      <main className={styles.main}>
        <PageTitle
          pageTitle={"🍎 Fruit Storage System"}
          github={"https://github.com/Your-Super-Shawn/fruit-storage-system-ts"}
        />

        <FruitTable />

        <div className={styles.grid}>
          {/* <a className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className={inter.className}>
              Store <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Store a specified amount of fruit to the storage.
            </p>
          </a> */}
        </div>
      </main>
    </div>
  );
}
