import Head from "next/head";
import { image } from "next/images";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import UserLayout from "@/components/UserLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  return (
    <userlayout>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.mainContainer__left}>
            <h1 className={styles.mainContainer__left__heading}>
              Welcome to ProConnect
            </h1>
            <p className={styles.mainContainer__left__description}>
              Connect with professionals, expand your network, and unlock new
              opportunities.
            </p>
            <div
              onClick={() => {
                router.push("/login");
              }}
              className={styles.buttonJoin}
            >
              <button className={styles.buttonJoin__button}>Join Now</button>
            </div>
          </div>
          <div className={styles.mainContainer__right}>
            <img
              src="/images/ProConnect.png"
              alt="ProConnect Logo"
              className={styles.logo}
            />
          </div>
        </div>
      </div>
    </userlayout>
  );
}
