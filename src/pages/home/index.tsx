/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type SetStateAction, useState } from "react";
import Map from "../../components/map";
import style from "./home.module.css";

export default function HomePage() {
  const [searchBar, setSearchBar] = useState(" ");
  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchBar(event.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // navigate("/search", { replace: true });
  };

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="query">Search...{"  "}</label>
          <input
            type="text"
            name="query"
            id="query"
            value={searchBar}
            className="rounded-md border border-gray-300 px-4"
            onChange={handleChange}
          />
        </form>
      </div>
      <div className={style.outerContainer}>
        <div className={style.map}>
          <Map searchBar={searchBar} />
        </div>
      </div>
    </div>
  );
}
