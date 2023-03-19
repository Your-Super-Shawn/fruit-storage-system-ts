import React from "react";
import Head from "next/head";

interface Props {
  pageTitle: string;
}

const PageHead = ({ pageTitle }: Props) => {
  return (
    <Head>
      <title>{`${pageTitle} - Snapsecret`}</title>
      <meta name="description" content="A service to burn after reading" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default PageHead;
