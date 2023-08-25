/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Link from "next/link";
import { useEffect,  } from "react";
import style from "./[id].module.css";
import { useRouter } from "next/router";
import { api, type RouterOutputs } from "~/utils/api";
import Modal from "../../../components/editPinModal";
import { useSession } from "next-auth/react";

export default function PinDetailsPage() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id, name, address, city, description, lat, lng, userName } = router.query;

  function handleDeletePin(id: string | string[] | undefined) {
    if (typeof id === "string") {
      void deletePin.mutate({ id: id });
    }
  }

  const deletePin = api.pin.delete.useMutation({
    onSuccess: async () => {
      await router.push("/home");
      window.location.reload();
      console.log("go back to map page.... gotta add functionality");
    },
  });

  const latValue = Array.isArray(lat) ? lat[0] : lat;
  const lngValue = Array.isArray(lng) ? lng[0] : lng;
  const latNumber =
    typeof latValue === "string" ? parseFloat(latValue) : latValue;
  const lngNumber =
    typeof lngValue === "string" ? parseFloat(lngValue) : lngValue;

  const idValue = Array.isArray(id) ? id[0] : id;
  const nameValue = Array.isArray(name) ? name[0] : name;
  const addressValue = Array.isArray(address) ? address[0] : address;
  const cityValue = Array.isArray(city) ? city[0] : city;
  const descriptionValue = Array.isArray(description)
    ? description[0]
    : description;

  return (
    <div className={style.bodyContainer}>
      <section className={style.sectionContainer}>
        {/* <div className={style.container}> */}
        <div className={style.left}>
          <div className={style.infoContainer}>
            <h2>
              {/* <FaCity className="icon" /> */}
              <br></br> {city}
            </h2>
            <br></br>

            <h2>
              {/* <FaMapMarkedAlt className="icon" />  */}
              <br></br> {address}
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

        <div className={style.right}>
          <h1>{name}</h1>
          <p>{description}</p>
          {/* <p>Pin Created By: {pinInfo.Owner?.username}</p> */}
          <div className={style.BtnContainer}>
            {sessionData?.user.name === userName ? (
              <div id="btn">
                <Modal
                  id={idValue}
                  name={nameValue}
                  address={addressValue}
                  city={cityValue}
                  description={descriptionValue}
                  lat={latNumber}
                  lng={lngNumber}
                ></Modal>
                <button
                  className={style.btn}
                  onClick={() => handleDeletePin(id)}
                >
                  DELETE
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
