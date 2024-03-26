import OneTimePaymentFeat from "./features/OneTimePayment";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <OneTimePaymentFeat />
    </main>
  );
}
