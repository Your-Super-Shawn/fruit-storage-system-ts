import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React from "react";
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

        {/* Backend APIs Test Playground*/}
        <FruitTable />

        {/* Version Notes*/}
        <div className={styles.grid}>
          <a
            className={styles.card}
            target="_blank"
            href={"https://github.com/Your-Super-Shawn/fruit-storage-system-ts"}
          >
            <h2 className={inter.className}>
              v1.1 <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              19/03/203 - It is implemented with Next.js, Apollo Client,
              GraphQL, and MongoDB.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}
