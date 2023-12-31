/* eslint-disable @typescript-eslint/no-misused-promises */
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import style from "./navbar.module.css";
// import { FaMapPin } from "react-icons/fa";
import { useRouter } from "next/router";

export const Navbar = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await router.push("/");
    void signOut();
  };

  return (
    <nav className={style.navbar}>
      <div className={style.navContainer}>
        <ul className={style.navMenu}>
          <Link
            href={sessionData?.user ? "/home" : "/"}
            className={style.navbarLogo}
          >
            PINIT
          </Link>
          <li className={style.navItem}>
            <div>
              <span className={style.welcome}>
                {sessionData?.user?.name ? (
                  `WELCOME, ${sessionData.user.name}`
                ) : (
                  <div>
                    <button
                      className={style.link}
                      onClick={() => void signIn()}
                    >
                      SIGN IN
                    </button>
                  </div>
                )}
              </span>
            </div>
          </li>

          {sessionData?.user?.name && (
            <>
              <li className={style.navItem}>
                <Link href="/createPin" className={style.link}>
                  CREATE PIN
                </Link>
              </li>
              <li className={style.navItem}>
                {/* TODO: This button should route to the logged in user profile */}
                <Link href="" className={style.link}>
                  PROFILE
                </Link>
              </li>
              <button className={style.link} onClick={handleSignOut}>
                SIGN OUT
              </button>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
