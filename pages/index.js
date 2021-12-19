import Head from "next/head";
import Layout from "../components/layout/Layout";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <main>
          <h1>Welcome to Saint John Tents!</h1>
        </main>
      </div>
    </Layout>
  );
}
