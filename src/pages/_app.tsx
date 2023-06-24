import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Navbar } from "~/components/navbar";
import { useRouter } from "next/router";
import { LatLngProvider } from "../contexts/latLng";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [pinlatLngContextState, setPinLatLngContextState] = useState({
    lat: 0,
    lng: 0,
  });
  const router = useRouter();
  const showHeader = router.pathname === "/" ? false : true;

  return (
    <SessionProvider session={session}>
      {showHeader && <Navbar />}
      <LatLngProvider>
        <Component {...pageProps} />
      </LatLngProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
