import Link from "next/link";
import { useRouter } from "next/router";
import { locales } from "@/lib/locales";
import styles from "./Header.module.scss";

export default function Header() {
  const router = useRouter();
  const { pathname, asPath, locale } = router;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" locale={locale} className={styles.logo}>
          My Site
        </Link>

        <div className={styles.langSwitch}>
          {Object.keys(locales).map((lang) => (
            <Link
              key={lang}
              href={asPath}
              locale={lang}
              className={`${styles.langLink} ${
                lang === locale ? styles.active : ""
              }`}
            >
              {locales[lang].flag}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
