import Header from "@/components/Header/Header";
import styles from "./Layout.module.scss";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
