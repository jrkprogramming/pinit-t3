import Link from "next/link";
import style from "./[id].module.css";
import { useRouter } from "next/router";

export default function PinDetailsPage() {
  const router = useRouter();
  const { name, address, city, description, lat, lng } = router.query;
  return (
    <div>
      <div className="container">
        <div className="left">
          <div className="infoContainer">
            <h2>
              {/* <FaCity className="icon" /> */}
              <br></br> {city}city
            </h2>
            <br></br>

            <h2>
              {/* <FaMapMarkedAlt className="icon" />  */}
              <br></br> {address}address
            </h2>
            <br></br>
            {/* <div className="imgContainer">
              <img src={image} alt={image_id}></img>
            </div> */}

            <p>
              {lng}, {lat}
            </p>
          </div>
        </div>

        <div className="right">
          <h1>{name}name</h1>
          <p>{description}descrip</p>
          {/* <p>Pin Created By: {pinInfo.Owner?.username}</p>
          <div className="BtnContainer">
            {user && pinInfo.Owner?._id === user._id ? (
              <div id="btn">
                <Link to={`/pins/edit/${pinInfo._id}`}>Edit Pin</Link>
                <button className="btn" onClick={() => deletePin(pinInfo._id)}>
                  DELETE
                </button>
              </div>
            ) : null}
          </div> */}
        </div>
      </div>
    </div>
  );
}
