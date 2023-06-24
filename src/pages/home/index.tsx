import Map from "../../components/map";
import style from "./home.module.css";

export default function HomePage() {
  return (
    <div className={style.outerContainer}>
      <div className={style.map}>
        <Map></Map>
      </div>
    </div>
  );
}
