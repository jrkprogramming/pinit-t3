import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import style from "./Navbar.module.css";
// import { FaMapPin } from "react-icons/fa";

export const Navbar = ({ navBarSwitch }) => {
  const { data: sessionData } = useSession();
  return (
    <>
      <nav className={style.navbar}>
        <div className={style.navContainer}>
          <ul className={style.navMenu}>
            <div>
              <Link href="/" className={style.navbarLogo}>
                PINIT
                {/* <FaMapPin className="pinIcon" /> */}
              </Link>
            </div>
            <li className={style.navItem}>
              <div>
                <span className={style.welcome} onClick={() => void signOut()}>
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

            <li className="nav-item">
              {sessionData?.user?.name ? (
                navBarSwitch === 1 ? (
                  <div>
                    <Link
                      href="/"
                      className={style.link}
                      // onClick={() => setNavBarSwitch(2)}
                    >
                      MY PINS
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link
                      href={`/home`}
                      className={style.link}
                      // onClick={() => setNavBarSwitch(1)}
                    >
                      ALL PINS
                    </Link>
                  </div>
                )
              ) : null}
            </li>
            <li className="navItem">
              <Link href="/newpin" className={style.link}>
                CREATE PIN
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
