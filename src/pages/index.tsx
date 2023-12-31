import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import style from "./index.module.css";
import { Navbar } from "../components/navbar";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const { data: sessionData } = useSession();
  return (
    <div className={style.videoContainer}>
      {/* <>
        <Head>
          <title>Create T3 App</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </> */}

      <video autoPlay loop muted playsInline className={style.video}>
        <source src="/city-vid.mp4" type="video/mp4" />
      </video>
      <div className={style.main}>
        <h2>Get off the beaten Path </h2>
        <h1>Find Adventure</h1>
        <p>
          Discover hidden gems, wherever you are. This App is the perfect way to
          explore different cities in a new way using maps to mark and upload
          your favorite &quot;off the grid&quot; places to share with others!
          Just click anywhere on the map to add a pin or search for any location
          with the Google Places API!{" "}
        </p>
        <div className={style.buttons}>
          {!sessionData?.user && (
            <button className={style.btn1} onClick={() => void signIn()}>
              LOGIN
            </button>
          )}
          {sessionData?.user && (
            <Link className={style.btn1} href={"/home"}>
              GO TO YOUR MAP
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
