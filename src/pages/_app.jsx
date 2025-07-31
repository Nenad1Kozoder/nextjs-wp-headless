import "@/styles/globals.scss";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div lang={router.locale}>
      <Component {...pageProps} />
    </div>
  );
}
