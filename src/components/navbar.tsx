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
            {/* <FaMapPin className="pinIcon" /> */}
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
              {/* <li className={style.navItem}>
                <div>
                  <Link href="/" className={style.link}>
                    MY PINS
                  </Link>
                </div>
              </li> */}
              {/* <li className={style.navItem}>
                <div>
                  <Link href="/home" className={style.link}>
                    ALL PINS
                  </Link>
                </div>
              </li> */}
              <li className={style.navItem}>
                <Link href="/createPin" className={style.link}>
                  CREATE PIN
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
